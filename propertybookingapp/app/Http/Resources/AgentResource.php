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
            'ID -> ' => $this->resource->id,
            'Agent-> ' => $this->resource->ime,
            'Adresa agenta -> ' => $this->resource->adresa,
            'Telefon -> ' => $this->resource->telefon,
            'Godine iskustva u poslu -> ' => $this->resource->godineIskustva,
        ];
    }
}
