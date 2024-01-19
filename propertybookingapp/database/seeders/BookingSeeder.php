<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Booking;


class BookingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        for ($i = 0; $i < 10; $i++) {
            Booking::factory()->create([
                'agent_id' => rand(1, 6), // Generiranje nasumičnog agent_id od 1 do 6
                'property_id' => rand(1, 7), // Generiranje nasumičnog property_id od 1 do 7
            ]);
        }
    }
}
