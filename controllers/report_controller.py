import db.database as database
from flask import Blueprint, jsonify, request


db = database.db
app = database.app

report_controller = Blueprint('report_controller', __name__)

@report_controller.route('/reports/comments', methods=['POST'])
def add_comment():
    data=request.json
    if data['text'] == None:
        return jsonify({'message': 'Comment not added. Text is needed'}), 400
    if data['id_report'] == None:
        return jsonify({'message': 'Comment not added. Id_report is needed'}), 400
    add_comentario(data['text'], data['id_report'])
    db.session.commit()
    return jsonify({'message': 'Comment added successfully.'}), 201

#ENDPOINT API to recieve a like and add it to the database
@report_controller.route('/reports/like', methods=['POST'])
def add_like():
    data=request.json
    id_report = data['id_report']
    report = database.reporte.query.get_or_404(id_report)
    report.add_likes(1)
    db.session.commit()
    return jsonify({'message': 'like added successfully.'}), 201

#ENDPOINT API to upload a reporte to the database
@report_controller.route('/reports/add', methods=['POST'])
def add_report():
    data=request.json
    if data['title'] == None:
        return jsonify({'message': 'Report not added. Title is needed'}), 400
    if data['description'] == None:
        return jsonify({'message': 'Report not added. Description is needed'}), 400
    if data['id_product'] == None:
        return jsonify({'message': 'Report not added. Id_product is needed'}), 400
    add_reporte(data['title'], data['description'], data['id_product'])
    db.session.commit()
    return jsonify({'message': 'Report added successfully.'}), 201


@report_controller.route('/reports/get', methods=['GET'])
def get_report():
    data=request.json
    quantity = data['quantity']
    id_product = data['id_product']
    #check if the id_product is in the database
    if database.producto.query.filter_by(id=id_product).first() == None:
        return jsonify({'message': 'The id_product is not in the database'}), 400
    reports = database.reporte.query.filter_by(id_producto=id_product).all()
    if int(quantity) > len(reports):
        return jsonify({'message': 'The number of reports asked is bigger than the number of reports in the database. The number of reports in the database is ' + str(len(reports)) + ' and the number asked is ' + str(quantity)}), 400
    reports = reports[-int(quantity):]
    reports_json = []
    for report in reports:
        report_json = {}
        report_json['id'] = report.id
        report_json['title'] = report.titulo
        report_json['description'] = report.descripcion
        report_json['likes'] = report.likes
        report_json['date'] = report.fecha
        reports_json.append(report_json)
    return jsonify(reports_json), 200

def add_estado(nombre):
    estado = database.estado(nombre)
    db.session.add(estado)
    db.session.commit()

def add_producto(nombre):
    producto = database.producto(nombre)
    db.session.add(producto)
    db.session.commit()

def add_reporte(titulo,descripcion,id_producto):
    reporte = database.reporte(titulo, descripcion, id_producto)
    db.session.add(reporte)
    db.session.commit()

def add_comentario(descripcion, id_reporte):
    comentario = database.comentario(descripcion, id_reporte)
    db.session.add(comentario)
    db.session.commit()