
from marshmallow import Schema, fields, validate


class CycleSchema(Schema):
    id = fields.Int(dump_only=True)
    date = fields.Date(required=True)
    flow = fields.Str(validate=validate.OneOf(['light', 'medium', 'heavy']))
    is_period = fields.Bool()
    is_fertile = fields.Bool()
    is_ovulation = fields.Bool()
    notes = fields.Str()
    created_at = fields.DateTime(dump_only=True)
    updated_at = fields.DateTime(dump_only=True)
