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
            'id' => $this->resource->id,
            'adresa' => $this->resource->adresa,
            'grad' => $this->resource->grad,
            'cena' => $this->resource->cena,
            'kvadratura' => $this->resource->kvadratura,
            'brojSoba' => $this->resource->brojSoba,
            'slika' => $this->resource->slika,
            'property_type' => new PropertyTypeResource($this->resource->property_type),
        ];
    }
}
