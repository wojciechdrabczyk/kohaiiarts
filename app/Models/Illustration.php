<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Storage;

class Illustration extends Model
{
    protected $fillable = [
        'path',
        'caption',
        'sort_order',
        'is_published',
        'meta',
    ];

    protected $casts = [
        'is_published' => 'boolean',
        'sort_order'   => 'integer',
        'meta'         => 'array',
    ];

    protected static function booted(): void
    {
        static::addGlobalScope('sort_order_first', function (Builder $q) {
            $q->orderBy('sort_order', 'asc')
                ->orderBy('id', 'asc');
        });
    }

    public function scopePublished($query)
    {
        return $query->where('is_published', true);
    }

    public function url(): string
    {
        return Storage::disk('public')->url($this->path);
    }
}
