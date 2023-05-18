import db.database as database
from flask import Blueprint, jsonify, request

user_controller = Blueprint('user_controller', __name__)

db = database.db
app = database.app

@user_controller.route('/dev/reportes/', methods=['GET'])
def get_reportes_from_dev():
    id_dev = request.args.get('id_dev')
    developer = database.desarrollador.query.filter_by(id=id_dev).first()
    if developer is None:
        return jsonify({'error': 'No existe el desarrollador'})
    #get all the where in the table reporte the id_dev is the same as the id_dev in the request
    reportes = database.reporte.query.filter_by(id_developer=id_dev).all()
    #if the estado from reporte is equal to 3, then the reporte is closed and should not be shown
    reportes = [reporte for reporte in reportes if reporte.id_estado != 3]
    #create a json with the information of the reportes
    reportes = [{'id': reporte.id, 'titulo': reporte.titulo, 'descripcion': reporte.descripcion, 'likes': reporte.likes, 'fecha': reporte.fecha, 'id_estado': reporte.id_estado, 'id_prioridad': reporte.id_prioridad, 'id_producto': reporte.id_producto} for reporte in reportes]
    #return the json
    return jsonify(reportes)

@user_controller.route('/dev/all/report-product/', methods=['GET'])
def get_all_reports_and_products():
    id_dev = request.args.get('id_dev')
    id_product = int(request.args.get('id_product'))
    developer = database.desarrollador.query.filter_by(id=id_dev).first()
    if developer is None:
        return jsonify({'error': 'No existe el desarrollador'})
    product = database.producto.query.filter_by(id=id_product).first()
    if product is None:
        return jsonify({'error': 'No existe el producto'})
    #get all the number of total reports where the id_dev is the same as the id_dev in the request and if the estado is not 0 or 3
    total_reports = len([reporte for reporte in database.reporte.query.filter_by(id_developer=id_dev).all() if reporte.id_estado != 0 and reporte.id_estado != 3])
    #now get the number of total reports where the id_dev is the same as the id_dev in the request and if the estado is 3 and the id_product is the same as the id_product in the request
    product_reports = len([reporte for reporte in database.reporte.query.filter_by(id_developer=id_dev).all() if reporte.id_estado != 0 and reporte.id_estado != 3 and reporte.id_producto == id_product])    
    #create a json with the information of the reportes
    reportes = {'total_reports': total_reports, 'product_reports': product_reports}
    #return the json
    return jsonify(reportes)


@user_controller.route('/dev/all-reportes-related-to-products/', methods=['GET'])
def get_all_reports_related_to_products():
    #first get the dev id
    id_dev = request.args.get('id_dev')
    #check if the id_dev is in the database
    if database.desarrollador.query.filter_by(id=id_dev).first() == None:
        return jsonify({'message': 'el id_dev no se encuentra en la base de datos'}), 400
    #get from desarrollador_producto table, all the products where the id_dev is the same as the id_dev in the request
    productos = database.desarrollador_producto.query.filter_by(id_desarrollador=id_dev).all()
    #create a list with the id_product from the productos
    id_productos = [producto.id_producto for producto in productos]
    #get all the reports where the id_producto is in the id_productos list
    reportes = database.reporte.query.filter(database.reporte.id_producto.in_(id_productos)).all()
    #create a json with the information of the reportes
    reportes_json = [{'id': reporte.id, 'titulo': reporte.titulo, 'descripcion': reporte.descripcion, 'likes': reporte.likes, 'fecha': reporte.fecha, 'id_estado': reporte.id_estado, 'id_prioridad': reporte.id_prioridad, 'id_producto': reporte.id_producto} for reporte in reportes]
    #return the json
    return jsonify(reportes_json), 200

async def add_desarrollador(nombre, email, id_rol):
    desarrollador = database.desarrollador(nombre, email, id_rol)
    db.session.add(desarrollador)
    db.session.commit()

async def add_cliente(nombre, email):
    cliente = database.cliente(nombre, email)
    db.session.add(cliente)
    db.session.commit()

async def add_id_rol(nombre):
    rol = database.rol(nombre)
    db.session.add(rol)
    db.session.commit()