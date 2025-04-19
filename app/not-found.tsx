"use client";

import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertTitle } from "@/components/ui/alert";
import Link from "next/link";
export default function NotFound() {
  return (
    <div className="bg-background text-foreground min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle className="text-center">404 - Page Not Found</CardTitle>
        </CardHeader>
        <CardContent>
          <Alert variant="destructive" className="w-full">
            <AlertTitle>The page you are looking for doesn&apos;t exist or has been moved</AlertTitle>
          </Alert>
          <div className="text-center mt-6">
            <p className="text-muted-foreground mb-6">It looks like you&apos;ve tried to navigate to a page that doesn&apos;t exist.</p>
            <Button variant="destructive" className="w-full">
              <Link href="/" className="flex items-center justify-center gap-2">
                Go to Homepage
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}