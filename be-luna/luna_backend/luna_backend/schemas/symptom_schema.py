
from marshmallow import Schema, fields, validate


class SymptomSchema(Schema):
    id = fields.Int(dump_only=True)
    date = fields.Date(required=True)
    symptoms = fields.List(fields.Str(), required=True)
    intensity = fields.Str(required=True, validate=validate.OneOf(['mild', 'moderate', 'severe']))
    notes = fields.Str()
    created_at = fields.DateTime(dump_only=True)
    updated_at = fields.DateTime(dump_only=True)
