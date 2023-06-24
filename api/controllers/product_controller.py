import db.database as database
from flask import Blueprint, jsonify, request


db = database.db
app = database.app

product_controller = Blueprint('product_controller', __name__)

@product_controller.route('/products/get/reports', methods=['GET'])
def get_reports():
    id_product = request.args.get('id_product')
    if database.producto.query.filter_by(id=id_product).first() == None:
        return jsonify({'message': 'The id_product is not in the database'}), 400
    #check all the reports where the id_product is the same as the id_product in the request
    reports = database.reporte.query.filter_by(id_producto=id_product).all()
    #now get all the reports where the estado is 0 
    reports = [reporte for reporte in reports if reporte.id_estado == 0]
    #create a json with the information of the reports'
    reports_json = [{'id': reporte.id, 'title': reporte.titulo, 'description': reporte.descripcion, 'likes': reporte.likes, 'date': reporte.fecha, 'id_estado': reporte.id_estado, 'id_prioridad': reporte.id_prioridad, 'id_producto': reporte.id_producto, 'id_developer' : reporte.id_developer} for reporte in reports]    
    return jsonify(reports_json), 200    

@product_controller.route('/product/get', methods=['GET'])
def get_product():
    id_product = request.args.get('id_product')
    product = database.producto.query.get_or_404(id_product)
    product_json = {}
    product_json['id'] = product.id
    product_json['nombre'] = product.nombre
    product_json['id_encargado'] = product.id_encargado
    return jsonify(product_json), 200   

@product_controller.route('/products/get/all_reports', methods=['GET'])
def get_all_reports():
    id_product = request.args.get('id_product')
    if database.producto.query.filter_by(id=id_product).first() == None:
        return jsonify({'message': 'The id_product is not in the database'}), 400
    #check all the reports where the id_product is the same as the id_product in the request
    reports = database.reporte.query.filter_by(id_producto=id_product).all()
    #create a json with the information of the reports'
    reports_json = [{'id': reporte.id, 'title': reporte.titulo, 'description': reporte.descripcion, 'likes': reporte.likes, 'date': reporte.fecha, 'id_estado': reporte.id_estado, 'id_prioridad': reporte.id_prioridad, 'id_producto': reporte.id_producto, 'id_developer' : reporte.id_developer} for reporte in reports]    
    return jsonify(reports_json), 200    

@product_controller.route('/products/all', methods=['GET'])
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

@product_controller.route('/products/get/developers', methods=['GET'])
def get_product_developers():
    id_product = request.args.get('id_product')
    if database.producto.query.filter_by(id=id_product).first == None:
        return jsonify({'message': 'el producto no se encuentra en la base de datos'}), 400
    desarrolladores = database.desarrollador_producto.query.filter_by(id_producto=id_product).all()
    if len(desarrolladores) == 0:
        return jsonify({'message': 'el producto no tiene desarrolladores asignados'}), 400
    developers_jsons = []
    for dp in desarrolladores:
        id_desarollador = dp.id_desarrollador
        developer = database.desarrollador.query.get_or_404(id_desarollador)
        developer_json = {}
        developer_json['id'] = developer.id
        developer_json['nombre'] = developer.nombre
        developer_json['email'] = developer.email
        developer_json['id_rol'] = developer.id_rol
        developers_jsons.append(developer_json)
    return jsonify(developers_jsons), 200