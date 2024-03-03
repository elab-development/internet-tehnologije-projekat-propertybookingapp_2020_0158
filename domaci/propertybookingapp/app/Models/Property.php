<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Property extends Model
{
    use HasFactory;

    protected $table = 'properties';

    protected $fillable = [
        'adresa',
        'grad',
        'cena',
        'kvadratura',
        'tipGradnje',
        'brojSoba',
        'slika',
        'property_type_id'
    ];

    public function bookings()
    {
        return $this->hasMany(Booking::class);
    }

    public function property_type()
    {
        return $this->belongsTo(PropertyType::class);
    }

}
