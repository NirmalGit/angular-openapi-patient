import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

/**
 * Functional Route Guard - Angular 20 Feature
 * Guards routes that require authentication
 */
export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  // In a real app, this would check authentication status
  // For demo purposes, we'll allow all routes
  const isAuthenticated = true; // Replace with actual auth check

  if (!isAuthenticated) {
    // Redirect to login page (when implemented)
    router.navigate(['/login']);
    return false;
  }

  return true;
};

/**
 * Functional Route Guard for Admin Routes
 * Demonstrates parameter-based guards
 */
export const adminGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  // Check if user has admin role
  const isAdmin = true; // Replace with actual role check

  if (!isAdmin) {
    router.navigate(['/unauthorized']);
    return false;
  }

  return true;
};