
from marshmallow import Schema, fields, validate


class HealthTipSchema(Schema):
    id = fields.Int(dump_only=True)
    title = fields.Str(required=True)
    content = fields.Str(required=True)
    category = fields.Str(required=True, validate=validate.OneOf(
        ['nutrition', 'exercise', 'mental', 'cycle', 'general']
    ))
