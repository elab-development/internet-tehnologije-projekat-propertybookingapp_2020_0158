<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\PropertyType;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Property>
 */
class PropertyFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'adresa' => $this->faker->streetAddress(),
            'grad' => $this->faker->city(),
            'cena' => $this->faker->numberBetween($min = 30000, $max = 600000),
            'tipGradnje' => $this->faker->randomElement($array= 
                array('Novogradnja','Starogradnja','U toku gradnje')),
            'brojSoba' => $this->faker->numberBetween($min = 30000, $max = 600000),
            'slika' => $this->faker->imageUrl,
            'property_type_id' => PropertyType::factory(),

        ];
    }
}
