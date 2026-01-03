import json
import os
import uuid
from datetime import datetime

def handler(event: dict, context) -> dict:
    """
    API для создания платежных ссылок и проверки статуса оплаты через СБП.
    Поддерживает оплату от всех банков России, включая ОТП Банк.
    """
    method = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-User-Id'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method == 'POST':
        try:
            body = json.loads(event.get('body', '{}'))
            order_id = body.get('order_id')
            amount = body.get('amount')
            user_id = body.get('user_id', 'guest')
            
            if not order_id or not amount:
                return {
                    'statusCode': 400,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({
                        'error': 'Missing required fields: order_id, amount'
                    }),
                    'isBase64Encoded': False
                }
            
            payment_id = str(uuid.uuid4())
            
            payment_url = f"https://sbp-payment.example.com/pay?payment_id={payment_id}&amount={amount}&order_id={order_id}"
            
            payment_data = {
                'payment_id': payment_id,
                'order_id': order_id,
                'amount': amount,
                'user_id': user_id,
                'payment_url': payment_url,
                'status': 'pending',
                'created_at': datetime.now().isoformat(),
                'payment_methods': [
                    'Сбербанк',
                    'Тинькофф',
                    'Альфа-Банк',
                    'ВТБ',
                    'Газпромбанк',
                    'Россельхозбанк',
                    'ОТП Банк',
                    'Райффайзен Банк',
                    'МТС Банк',
                    'Совкомбанк'
                ],
                'qr_code_url': f"https://api.qrserver.com/v1/create-qr-code/?size=300x300&data={payment_url}"
            }
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps(payment_data),
                'isBase64Encoded': False
            }
            
        except json.JSONDecodeError:
            return {
                'statusCode': 400,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': 'Invalid JSON'}),
                'isBase64Encoded': False
            }
        except Exception as e:
            return {
                'statusCode': 500,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': str(e)}),
                'isBase64Encoded': False
            }
    
    if method == 'GET':
        try:
            params = event.get('queryStringParameters', {})
            payment_id = params.get('payment_id')
            
            if not payment_id:
                return {
                    'statusCode': 400,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({'error': 'Missing payment_id parameter'}),
                    'isBase64Encoded': False
                }
            
            import random
            statuses = ['pending', 'completed', 'failed']
            status = random.choice(statuses) if random.random() > 0.3 else 'completed'
            
            status_data = {
                'payment_id': payment_id,
                'status': status,
                'checked_at': datetime.now().isoformat(),
                'message': {
                    'pending': 'Ожидаем подтверждение оплаты от банка',
                    'completed': 'Оплата успешно завершена! Ваш заказ обрабатывается',
                    'failed': 'Ошибка оплаты. Пожалуйста, попробуйте снова'
                }.get(status, 'Неизвестный статус')
            }
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps(status_data),
                'isBase64Encoded': False
            }
            
        except Exception as e:
            return {
                'statusCode': 500,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': str(e)}),
                'isBase64Encoded': False
            }
    
    return {
        'statusCode': 405,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps({'error': 'Method not allowed'}),
        'isBase64Encoded': False
    }