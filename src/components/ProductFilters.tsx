'use client';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Filter } from 'lucide-react';

export type SortOption = 'price-asc' | 'price-desc' | 'name-asc' | 'name-desc' | 'rating-desc' | 'rating-asc';

interface ProductFiltersProps {
  categories: string[];
  onSortChange: (value: SortOption) => void;
  onCategoryChange: (value: string) => void;
  sortValue: SortOption;
  categoryValue: string;
}

export function ProductFilters({
  categories,
  onSortChange,
  onCategoryChange,
  sortValue,
  categoryValue,
}: ProductFiltersProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" />
          篩選器
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">篩選與排序</h4>
            <p className="text-sm text-muted-foreground">
              依據您的喜好調整商品顯示。
            </p>
          </div>
          <div className="grid gap-4">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="category">種類</Label>
              <Select onValueChange={onCategoryChange} value={categoryValue}>
                <SelectTrigger id="category" className="col-span-2 h-8">
                  <SelectValue placeholder="選擇種類" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">所有種類</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="sort-price">價格</Label>
              <Select onValueChange={(v) => onSortChange(v as SortOption)} value={sortValue.startsWith('price') ? sortValue : ''}>
                <SelectTrigger id="sort-price" className="col-span-2 h-8">
                  <SelectValue placeholder="選擇排序方式" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="price-asc">從低到高</SelectItem>
                  <SelectItem value="price-desc">從高到低</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="sort-name">字母</Label>
              <Select onValueChange={(v) => onSortChange(v as SortOption)} value={sortValue.startsWith('name') ? sortValue : ''}>
                <SelectTrigger id="sort-name" className="col-span-2 h-8">
                  <SelectValue placeholder="選擇排序方式" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name-asc">A到Z</SelectItem>
                  <SelectItem value="name-desc">Z到A</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="sort-rating">熱銷</Label>
              <Select onValueChange={(v) => onSortChange(v as SortOption)} value={sortValue.startsWith('rating') ? sortValue : ''}>
                <SelectTrigger id="sort-rating" className="col-span-2 h-8">
                  <SelectValue placeholder="選擇排序方式" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rating-desc">從高到低</SelectItem>
                  <SelectItem value="rating-asc">從低到高</SelectItem>
                </SelectContent>
              </Select>
            </div>

          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
