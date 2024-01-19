<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    use HasFactory;

    protected $fillable = [
        'nacinPlacanja',
        'izvrsenoPlacanje',
        'datumPlacanja',
        'brojDana',
        'property_id',
        'agent_id'
    ];

    public function agent()
    {
        return $this->belongsTo(Agent::class);
    }

    public function property()
    {
        return $this->belongsTo(Property::class);
    }
}
