<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AgentResource extends JsonResource
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
            'ime' => $this->resource->ime,
            'adresa' => $this->resource->adresa,
            'telefon' => $this->resource->telefon,
            'godineIskustva' => $this->resource->godineIskustva,
        ];
    }
}
