<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\PropertyType>
 */
class PropertyTypeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'nazivTipa' => $this->faker->randomElement($array= 
                array('Stan','Kuca','Vikendica','Salon','Poslovni prostor','Plac','Penthouse'
            ,'Vila','Zemljiste')),
        ];
    }
}
