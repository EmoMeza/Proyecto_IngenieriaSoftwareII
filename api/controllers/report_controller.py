import db.database as database
from flask import Blueprint, jsonify, request


db = database.db
app = database.app

report_controller = Blueprint('report_controller', __name__)

@report_controller.route('/reports/comments', methods=['POST'])
def add_comment():
    data=request.json
    id_report = request.args.get('id_report')
    #check if the id_report is in the database
    if database.reporte.query.filter_by(id=id_report).first() == None:
        return jsonify({'message': 'The id_report is not in the database'}), 400
    if data['text'] == None:
        return jsonify({'message': 'Comment not added. Text is needed'}), 400
    add_comentario(data['text'], id_report)
    db.session.commit()
    return jsonify({'message': 'Comment added successfully.'}), 201

#ENDPOINT API to recieve a like and add it to the database
@report_controller.route('/reports/like', methods=['POST'])
def add_like():

    id_report = request.args.get('id_report')
    report = database.reporte.query.get_or_404(id_report)
    report.add_likes(1)
    db.session.commit()
    return jsonify({'message': 'like added successfully.'}), 201

#ENDPOINT API to upload a reporte to the database
@report_controller.route('/reports/add', methods=['POST'])
def add_report():
    data=request.json
    id_product = request.args.get('id_product')
    if database.producto.query.filter_by(id=id_product).first() == None:
        return jsonify({'message': 'The id_product is not in the database'}), 400
    if data['title'] == None:
        return jsonify({'message': 'Report not added. Title is needed'}), 400
    if data['description'] == None:
        return jsonify({'message': 'Report not added. Description is needed'}), 400
    add_reporte(data['title'], data['description'], id_product)
    db.session.commit()
    return jsonify({'message': 'Report added successfully.'}), 201

@report_controller.route('/comments/get', methods=['GET'])
def get_comments():
    id_report = request.args.get('id_report')
    #check if the id_report is in the database
    if database.reporte.query.filter_by(id=id_report).first() == None:
        return jsonify({'message': 'The id_report is not in the database'}), 400
    comments = database.comentario.query.filter_by(id_reporte=id_report).all()
    comments_json = []   
    for comment in comments:
        comment_json = {}
        comment_json['id'] = comment.id
        comment_json['contenido'] = comment.contenido
        comment_json['date'] = comment.fecha
        comments_json.append(comment_json)
    return jsonify(comments_json), 200


@report_controller.route('/reports/get', methods=['GET'])
def get_report():
    quantity = request.args.get('quantity')
    id_product = request.args.get('id_product')
    #check if the id_product is in the database
    if database.producto.query.filter_by(id=id_product).first() == None:
        return jsonify({'message': 'The id_product is not in the database'}), 400
    if quantity == None:
        return jsonify({'message': 'Quantity not specified'}), 400
    #check if the quantity is bigger than the number of reports with the product id
    if int(quantity) > database.reporte.query.filter_by(id_producto=id_product).count():
        #return the number of quantity asked and the number of reports with the product id
        return jsonify({'message': 'The quantity is bigger than the number of reports. Quantity asked is: '+ quantity+' The number of reports with the product id is: ' + str(database.reporte.query.filter_by(id_producto=id_product).count())}), 400

    reports = database.reporte.query.filter_by(id_producto=id_product).order_by(database.reporte.likes.desc()).limit(quantity).all()
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

@report_controller.route('/reports/all', methods=['GET'])
def get_all_reports():
    reports = database.reporte.query.all()
    reports_json = []   
    for report in reports:
        report_json = {}
        report_json['id'] = report.id
        report_json['title'] = report.titulo
        report_json['description'] = report.descripcion
        report_json['likes'] = report.likes
        report_json['date'] = report.fecha
        report_json['id_producto'] = report.id_producto
        report_id_estado = report.id_estado
        if database.estado.query.filter_by(id=report_id_estado).first() == None:
            return jsonify({'message': 'el estado no se encuentra en la base de datos'}), 400
        estado = database.estado.query.filter_by(id=report_id_estado).first()
        report_json['estado'] = estado.nombre
        reports_json.append(report_json)
    return jsonify(reports_json), 200

@report_controller.route('/products/all', methods=['GET'])
def get_all_products():
    products = database.producto.query.all()
    products_json = []
    for product in products:
        product_json = {}
        product_json['id'] = product.id
        product_json['nombre'] = product.nombre
        product_json['id_encargado'] = product.id_encargado
        products_json.append(product_json)
    return jsonify(products_json), 200
        

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