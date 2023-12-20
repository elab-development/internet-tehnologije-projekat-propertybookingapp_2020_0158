<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Agent extends Model
{
    use HasFactory;

    protected $fillable = [
        'ime',
        'adresa',
        'telefon',
        'godineIskustva',
    ];

    public function bookings()
    {
        return $this->hasMany(Booking::class);
    }
}
