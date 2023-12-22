<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;


class PropertyResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'ID -> ' => $this->resource->id,
            'Adresa nekretnine -> ' => $this->resource->adresa,
            'Grad -> ' => $this->resource->grad,
            'Cena nekretnine u EUR -> ' => $this->resource->cena,
            'Kvadratura u m2 -> ' => $this->resource->kvadratura,
            'Broj soba -> ' => $this->resource->brojSoba,
            'Slika -> ' => $this->resource->slika,
            'Tip nekretnine -> ' => new PropertyTypeResource($this->resource->property_type),
        ];
    }
}
