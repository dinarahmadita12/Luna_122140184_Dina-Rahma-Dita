from marshmallow import Schema, fields, validate

class MoodSchema(Schema):
    id = fields.Int(dump_only=True)
    date = fields.Date(required=True)
    mood = fields.Str(required=True, validate=validate.OneOf(['great', 'good', 'okay', 'bad', 'awful']))
    notes = fields.Str(allow_none=True)  # Bisa kosong
    created_at = fields.DateTime(dump_only=True)
    updated_at = fields.DateTime(dump_only=True)
