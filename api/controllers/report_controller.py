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
    id_user = request.args.get('id_user')
    report = database.reporte.query.get_or_404(id_report)
    user = database.desarrollador.query.get_or_404(id_user)
    if database.like.query.filter_by(id_desarrollador=id_user, id_reporte=id_report).first() != None:
        return jsonify({'message': 'The like is already in the database'}), 400
    add_like(id_user, id_report)
    report.add_likes(1)
    db.session.commit()
    return jsonify({'message': 'like added successfully.'}), 201

#ENDPOINT API to upload a reporte to the database
@report_controller.route('/reports/add', methods=['POST'])
def add_report():
    data=request.json
    id_product = request.args.get('id_product')
    id_cliente = request.args.get('id_cliente')
    if database.producto.query.filter_by(id=id_product).first() == None:
        return jsonify({'message': 'The id_product is not in the database'}), 400
    if data['title'] == None:
        return jsonify({'message': 'Report not added. Title is needed'}), 400
    if data['description'] == None:
        return jsonify({'message': 'Report not added. Description is needed'}), 400
    add_reporte(data['title'], data['description'], id_product, id_cliente)
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
        report_json['id_producto'] = report.id_producto
        report_json['id_prioridad'] = report.id_prioridad
        report_json['id_estado'] = report.id_estado
        report_json['id_developer'] = report.id_developer
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
        report_json['id_prioridad'] = report.id_prioridad
        report_json['id_estado'] = report.id_estado
        report_json['id_developer'] = report.id_developer
        reports_json.append(report_json)
    return jsonify(reports_json), 200

@report_controller.route('/reports/update/estado', methods=['POST'])
def update_estado():
    id_report = request.args.get('id_report')
    id_estado = request.args.get('id_estado')
    if database.reporte.query.filter_by(id=id_report).first() == None:
        return jsonify({'message': 'The id_report is not in the database'}), 400
    if database.estado.query.filter_by(id=id_estado).first() == None:
        return jsonify({'message': 'The id_estado is not in the database'}), 400
    report = database.reporte.query.get_or_404(id_report)
    report.id_estado = id_estado
    db.session.commit()
    return jsonify({'message': 'Estado updated successfully.'}), 201

@report_controller.route('/reports/update/prioridad', methods=['POST'])
def update_prioridad():
    id_report = request.args.get('id_report')
    id_prioridad = request.args.get('id_prioridad')
    if database.reporte.query.filter_by(id=id_report).first() == None:
        return jsonify({'message': 'The id_report is not in the database'}), 400
    if database.prioridad.query.filter_by(id=id_prioridad).first() == None:
        return jsonify({'message': 'The id_estado is not in the database'}), 400
    report = database.reporte.query.get_or_404(id_report)
    report.id_prioridad = id_prioridad
    db.session.commit()
    return jsonify({'message': 'Estado updated successfully.'}), 201

    

@report_controller.route('/reports/check/estados', methods=['GET'])
def check_estados():
    id_report= request.args.get('id_report')
    if database.reporte.query.filter_by(id=id_report).first() == None:
        return jsonify({'message': 'The id_report is not in the database'}), 400
    #return all the estados, but the id=0 and the current id_estado
    estados = database.estado.query.filter(database.estado.id != 0).filter(database.estado.id != database.reporte.query.get_or_404(id_report).id_estado).all()
    estados_json = []
    for estado in estados:
        estado_json = {}
        estado_json['id'] = estado.id
        estado_json['nombre'] = estado.nombre
        estados_json.append(estado_json)
    return jsonify(estados_json), 200

@report_controller.route('/reports/estados/all', methods=['GET'])
def all_estados():
    #return all the estados
    estados = database.estado.query.all()
    estados_json = []
    for estado in estados:
        estado_json = {}
        estado_json['id'] = estado.id
        estado_json['nombre'] = estado.nombre
        estados_json.append(estado_json)
    return jsonify(estados_json), 200

@report_controller.route('/reports/add/developer/', methods=['POST'])
def add_developer():
    id_report = request.args.get('id_report')
    id_developer = request.args.get('id_dev')
    if database.reporte.query.filter_by(id=id_report).first() == None:
        return jsonify({'message': 'The id_report is not in the database'}), 400
    if database.desarrollador.query.filter_by(id=id_developer).first() == None:
        return jsonify({'message': 'The id_developer is not in the database'}), 400
    report = database.reporte.query.get_or_404(id_report)
    report.id_developer = id_developer
    report.id_estado = 1
    db.session.commit()
    return jsonify({'message': 'Developer added successfully.'}), 201

@report_controller.route('/reports/all/product/', methods=['GET'])
def get_all_reports_from_a_specific_product():
    id_product = request.args.get('id_product')
    if database.producto.query.filter_by(id=id_product).first() == None:
        return jsonify({'message': 'The id_product is not in the database'}), 400
    reports = database.reporte.query.filter_by(id_producto=id_product).all()
    #revisar si se quiere asi o que solamente entregue una lista vacia
    if len(reports) == 0:
        return jsonify({'message': 'There are no reports with that id_product'}), 400
    reports_json = []   
    for report in reports:
        report_json = {}
        report_json['id'] = report.id
        report_json['title'] = report.titulo
        report_json['description'] = report.descripcion
        report_json['likes'] = report.likes
        report_json['date'] = report.fecha
        report_json['id_producto'] = report.id_producto
        report_json['id_prioridad'] = report.id_prioridad
        report_json['id_estado'] = report.id_estado
        report_json['id_developer'] = report.id_developer
        reports_json.append(report_json)
    return jsonify(reports_json), 200

@report_controller.route('/report/get', methods=['GET'])
def get_single_report():
    id_report = request.args.get('id_report')
    report = database.reporte.query.get_or_404(id_report)
    report_json = {}
    report_json['id'] = report.id
    report_json['title'] = report.titulo
    report_json['description'] = report.descripcion
    report_json['likes'] = report.likes
    report_json['date'] = report.fecha
    report_json['id_producto'] = report.id_producto
    report_json['id_prioridad'] = report.id_prioridad
    report_json['id_estado'] = report.id_estado
    report_json['id_developer'] = report.id_developer
    return jsonify(report_json), 200

@report_controller.route('/reports/prioridad/all', methods=['GET'])
def all_prioridad():
    #return all the estados
    prioridades = database.prioridad.query.all()
    prioridades_json = []
    for prioridad in prioridades:
        prioridad_json = {}
        prioridad_json['id'] = prioridad.id
        prioridad_json['nombre'] = prioridad.nombre
        prioridades_json.append(prioridad_json)
    return jsonify(prioridades_json), 200

def add_desarrollador_producto(id_desarrollador, id_producto):
    desarrollador_producto = database.desarrollador_producto(id_desarrollador, id_producto)
    db.session.add(desarrollador_producto)
    db.session.commit()

def add_estado(nombre):
    estado = database.estado(nombre)
    db.session.add(estado)
    db.session.commit()

def add_producto(nombre):
    producto = database.producto(nombre)
    db.session.add(producto)
    db.session.commit()

def add_reporte(titulo,descripcion,id_producto,id_cliente):
    reporte = database.reporte(titulo, descripcion, id_producto,id_cliente)
    db.session.add(reporte)
    db.session.commit()
    
def add_comentario(descripcion, id_reporte):
    comentario = database.comentario(descripcion, id_reporte)
    db.session.add(comentario)
    db.session.commit()
    
def add_like(id_user, id_reporte):
    like = database.like(id_user,id_reporte)
    db.session.add(like)
    db.session.commit()