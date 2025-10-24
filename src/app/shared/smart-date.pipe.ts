import { Pipe, PipeTransform, inject, signal } from '@angular/core';

/**
 * Modern Angular 20 Pipe with Signals
 * Formats dates with intelligent relative time display
 */
@Pipe({
  name: 'smartDate',
  standalone: true,
  pure: false // Impure pipe for dynamic updates
})
export class SmartDatePipe implements PipeTransform {
  // Angular 20: Using signals for internal state
  private currentTime = signal(new Date());

  // Update current time every minute for relative time calculations
  private intervalId = setInterval(() => {
    this.currentTime.set(new Date());
  }, 60000); // Update every minute

  transform(value: string | Date | null | undefined, format: 'relative' | 'absolute' | 'smart' = 'smart'): string {
    if (!value) return '';

    const date = new Date(value);
    if (isNaN(date.getTime())) return 'Invalid Date';

    const now = this.currentTime();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    switch (format) {
      case 'relative':
        return this.getRelativeTime(diffMs);

      case 'absolute':
        return date.toLocaleDateString();

      case 'smart':
      default:
        // Smart formatting: relative for recent dates, absolute for older ones
        if (Math.abs(diffDays) <= 7) {
          return this.getRelativeTime(diffMs);
        } else {
          return date.toLocaleDateString();
        }
    }
  }

  private getRelativeTime(diffMs: number): string {
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMs < 0) {
      // Future date
      if (Math.abs(diffMinutes) < 60) {
        return `In ${Math.abs(diffMinutes)} minute${Math.abs(diffMinutes) !== 1 ? 's' : ''}`;
      } else if (Math.abs(diffHours) < 24) {
        return `In ${Math.abs(diffHours)} hour${Math.abs(diffHours) !== 1 ? 's' : ''}`;
      } else {
        return `In ${Math.abs(diffDays)} day${Math.abs(diffDays) !== 1 ? 's' : ''}`;
      }
    } else {
      // Past date
      if (diffMinutes < 1) return 'Just now';
      if (diffMinutes < 60) return `${diffMinutes} minute${diffMinutes !== 1 ? 's' : ''} ago`;
      if (diffHours < 24) return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
      if (diffDays < 7) return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
      return `${Math.floor(diffDays / 7)} week${Math.floor(diffDays / 7) !== 1 ? 's' : ''} ago`;
    }
  }

  // Cleanup interval when pipe is destroyed
  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}