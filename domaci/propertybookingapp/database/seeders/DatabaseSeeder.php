<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
Use Database\Seeders\PropertySeeder;
Use Database\Seeders\AgentSeeder;
Use Database\Seeders\PropertyTypeSeeder;
Use Database\Seeders\BookingSeeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            AgentSeeder::class,
            PropertyTypeSeeder::class,
            PropertySeeder::class,
            BookingSeeder::class,
        ]);
    }
}
