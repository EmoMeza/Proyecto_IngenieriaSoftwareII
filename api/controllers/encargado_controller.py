import db.database as database
from flask import Blueprint, jsonify, request


db = database.db
app = database.app

encargado_controller = Blueprint('encargado_controller', __name__)

#ENDPOINT API para agregar una solicitud de reasignacion a la BD
@encargado_controller.route('/reasignacion/add/', methods=['POST'])
def add_reasingation_petition():
    data=request.json
    id_report = request.args.get('id_report')
    id_developer = request.args.get('id_developer')
    if database.reporte.query.filter_by(id=id_report).first() == None:
        return jsonify({'message': 'The id_report is not in the database'}), 400
    if database.desarrollador.query.filter_by(id=id_developer).first() == None:
        return jsonify({'message': 'The id_dev is not in the database'}), 400
    if database.solicitud_reasignacion.query.filter_by(id_dev=id_developer,id_reporte = id_report).first() != None:
        return jsonify({'message': 'The id_dev is already in the database'}), 400
    add_solicitud_reasignacion(id_report,id_developer, data['motivo'])
    db.session.commit()
    return jsonify({'message': 'solicitud de reasignacion agregada exitosamente.'}), 201

@encargado_controller.route('/reasignacion/delete/', methods=['DELETE'])
def delete_reasingation_petition():
    id_report = request.args.get('id_report')
    id_dev = request.args.get('id_dev')
    petition = database.solicitud_reasignacion.query.get_or_404([id_dev,id_report])
    db.session.delete(petition)
    db.session.commit()
    return jsonify({'message': 'solicitud de reasignacion borrada exitosamente.'}), 201

@encargado_controller.route('/reasignacion/get/all/product/', methods=['GET'])
def get_all_reasignation_petitions_from_a_specific_product():
    id_product = request.args.get('id_product')
    if database.producto.query.filter_by(id=id_product).first() == None:
        return jsonify({'message': 'The id_product is not in the database'}), 400
    reports = database.reporte.query.filter_by(id_producto=id_product).all()
    reasignacion_jsons = []
    for report in reports:
        petitions = database.solicitud_reasignacion.query.filter_by(id_reporte=report.id).all()
        #also get the name of the developer and title of the report
        for petition in petitions:
            petition_json = {}
            petition_json['id_report'] = petition.id_reporte
            petition_json['id_developer'] = petition.id_dev
            petition_json['date'] = petition.fecha
            petition_json['motivo'] = petition.motivo
            petition_json['developer_name'] = database.desarrollador.query.filter_by(id=petition.id_dev).first().nombre
            report = database.reporte.query.filter_by(id=petition.id_reporte).first()
            petition_json['report_title'] = report.titulo
            petition_json['id_prioridad'] = report.id_prioridad
            reasignacion_jsons.append(petition_json)
    return jsonify(reasignacion_jsons), 200

@encargado_controller.route('/reasignacion/get/motivo/report/', methods=['GET'])
def get_motivo_reasignation_petition_from_a_specific_report():
    id_report = request.args.get('id_report')
    if database.reporte.query.filter_by(id=id_report).first() == None:
        return jsonify({'message': 'The id_report is not in the database'}), 400
    #check is the id_report is in the solicitud_reasignacion table
    if database.solicitud_reasignacion.query.filter_by(id_reporte=id_report).first() == None:
        return jsonify({'message': 'The id_report is not in the solicitud_reasignacion table'}), 400
    petitions = database.solicitud_reasignacion.query.filter_by(id_reporte=id_report).all()
    petition = petitions[0]
    petition_json = {}
    petition_json['motivo'] = petition.motivo
    return jsonify(petition_json), 200

def add_solicitud_reasignacion(id_report,id_developer, motivo):
    reasignation = database.solicitud_reasignacion(id_report,id_developer,motivo)
    db.session.add(reasignation)
    db.session.commit()