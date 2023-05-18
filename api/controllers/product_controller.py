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
    reports = [report for report in reports if report.id_estado == 0]
    #create a json with the information of the reports'
    reports_json = [{'id': report.id, 'titulo': report.titulo, 'descripcion': report.descripcion, 'likes': report.likes, 'fecha': report.fecha, 'id_estado': report.id_estado, 'id_prioridad': report.id_prioridad, 'id_producto': report.id_producto} for report in reports]    
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
