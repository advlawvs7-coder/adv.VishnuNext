"use client";
import { Suspense } from "react";
import RouteProgress from "./RouteProgress";
export default function RouteProgressMount() { return <Suspense fallback={null}><RouteProgress/></Suspense>; }
