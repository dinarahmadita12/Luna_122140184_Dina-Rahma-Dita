
from marshmallow import Schema, fields, validate


class MedicationSchema(Schema):
    id = fields.Int(dump_only=True)
    name = fields.Str(required=True)
    time = fields.Str(required=True)  # Format: HH:MM
    frequency = fields.Str(required=True, validate=validate.OneOf(['daily', 'weekly', 'monthly', 'as-needed']))
    taken = fields.Bool()
    last_taken = fields.DateTime()
    notes = fields.Str()
    created_at = fields.DateTime(dump_only=True)
    updated_at = fields.DateTime(dump_only=True)
