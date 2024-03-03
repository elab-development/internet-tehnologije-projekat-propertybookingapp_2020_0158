<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\PropertyType;

class PropertyTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $propertyTypes = [
            'Kuca',
            'Stan',
            'Vikendica',
            'Poslovni prostor',
            'Plac',
            'Zemljište',
            'Penthouse',
            'Vila',
        ];

        foreach ($propertyTypes as $type) {
            PropertyType::create([
                'nazivTipa' => $type,
            ]);
        } 
    }
}
