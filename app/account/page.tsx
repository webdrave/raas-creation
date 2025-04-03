"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AccountPage() {
  const router = useRouter();
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <h2>Loading...</h2>;
  }

  if (!session?.user) {
    return router.push("/login");
  }

  router.push("/account/orders");
}
