<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Property;
use App\Models\Agent;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Booking>
 */
class BookingFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'nacinPlacanja' => $this->faker->randomElement($array= array('Gotovina','Kartica','Cekovi')),
            'izvrsenoPlacanje' => $this->faker->randomElement($array= array('DA','NE')),
            'datumPlacanja' => $this->faker->date(),
            'brojDana' => $this->faker->numberBetween($min = 1, $max = 30),
            'property_id' => Property::factory(),
            'agent_id' => Agent::factory(),
        ];
    }
}
