"use client";
import axios from "axios";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import Link from "next/link";
import PasswordInput from "../PasswordInput";
import { API_URL, TOKEN_KEY } from "@/lib/config";
import React, { useState } from "react"; // เพิ่ม useState

const formSchema = z.object({
  username: z.string().max(100, { message: "ชื่อต้องไม่เกิน 50 ตัวอักษร" }),
  password: z
    .string()
    .min(5, { message: "รหัสผ่านต้องมีอย่างน้อย 5 ตัวอักษร" })
    .max(100, { message: "รหัสผ่านต้องไม่เกิน 20 ตัวอักษร" })
    .regex(/[a-zA-Z0-9]/, {
      message: "รหัสผ่านต้องมีอย่างน้อย 1 ตัวอักษร และ 1 ตัวเลข",
    }),
});

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false); // ✅ เพิ่ม state โหลดดิ้ง
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true); // ✅ เริ่มโหลด
      const response = await axios.post(`${API_URL}/api/user/signin`, values);
      if (response.data.token !== undefined) {
        localStorage.setItem(TOKEN_KEY!, response.data.token);
        localStorage.setItem("bun_service_name", response.data.user.username);
        localStorage.setItem("bun_service_level", response.data.user.level);
        router.push("/backoffice/dashboard");
        toast.success("ล็อกอินสำเร็จ!", {
          description: "ระบบกำลังนำคุณเข้าสู่บัญชีของคุณ",
        });
      } else {
        toast.error("เกิดข้อผิดพลาดในการล็อกอิน");
      }
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("เกิดข้อผิดพลาดในการล็อกอิน");
    } finally {
      setIsLoading(false); // ✅ หยุดโหลด ไม่ว่าจะสำเร็จหรือไม่
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">เข้าสู่ระบบ</CardTitle>
        <CardDescription>
          กรอกอีเมล์และรหัสผ่านของคุณเพื่อเข้าสู่ระบบบัญชีของคุณ
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid gap-4">
              {/* Username */}
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem className="grid gap-2">
                    <FormLabel htmlFor="username">Username</FormLabel>
                    <FormControl>
                      <Input
                        id="username"
                        placeholder="username"
                        type="text"
                        autoComplete="username"
                        disabled={isLoading} // ✅ ปิดช่องระหว่างโหลด
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Password */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="grid gap-2">
                    <div className="flex justify-between items-center">
                      <FormLabel htmlFor="password">Password</FormLabel>
                      <Link
                        href="#"
                        className="ml-auto inline-block text-sm underline"
                      >
                        ลืมรหัสผ่านใช่ไหม?
                      </Link>
                    </div>
                    <FormControl>
                      <PasswordInput
                        field={field}
                        id="password"
                        placeholder="******"
                        autoComplete="current-password"
                        disabled={isLoading} // ✅ ปิดช่องระหว่างโหลด
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Submit button */}
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "กำลังเข้าสู่ระบบ..." : "Login"}
              </Button>
              <Button variant="outline" className="w-full" disabled={isLoading}>
                Login with Google
              </Button>
            </div>
          </form>
        </Form>
        <div className="mt-4 text-center text-sm">
          ยังไม่มีบัญชี?{" "}
          <Link href="#" className="underline">
            Sign up
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
