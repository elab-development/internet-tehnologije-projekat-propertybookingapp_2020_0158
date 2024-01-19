<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Property;

class PropertySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        for ($i = 0; $i < 7; $i++) {
            Property::factory()->create([
                'property_type_id' => rand(1, 7), // nasumičan broj od 1 do 7 za tip
            ]);
        }
    }
}
