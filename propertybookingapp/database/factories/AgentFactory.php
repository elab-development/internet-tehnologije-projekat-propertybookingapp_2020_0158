<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;


/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Agent>
 */
class AgentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'ime' => $this->faker->name(),
            'adresa' => $this->faker->streetAddress(),
            'telefon' => $this->faker->phoneNumber(),
            'godineIskustva' => $this->faker->numberBetween($min = 1, $max = 30),
        ];
    }
}
