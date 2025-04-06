/* eslint-disable react-hooks/exhaustive-deps */
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
import { API_URL, TOKEN_KEY } from "@/lib/config";
import PasswordInput from "../PasswordInput";
import { useEffect, useState } from "react";

const formSchema = z
  .object({
    username: z.string().max(100, { message: "ชื่อต้องไม่เกิน 50 ตัวอักษร" }),
    password: z
      .string()
      .min(5, { message: "รหัสผ่านต้องมีอย่างน้อย 5 ตัวอักษร" })
      .max(100, { message: "รหัสผ่านต้องไม่เกิน 20 ตัวอักษร" })
      .regex(/[a-zA-Z0-9]/, {
        message: "รหัสผ่านต้องมีอย่างน้อย 1 ตัวอักษร และ 1 ตัวเลข",
      }),
    confirmPassword: z
      .string()
      .min(5, { message: "รหัสผ่านต้องมีอย่างน้อย 5 ตัวอักษร" })
      .max(100, { message: "รหัสผ่านต้องไม่เกิน 20 ตัวอักษร" })
      .regex(/[a-zA-Z0-9]/, {
        message: "รหัสผ่านต้องมีอย่างน้อย 1 ตัวอักษร และ 1 ตัวเลข",
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"], // ชี้ไปที่ฟิลด์ที่จะโชว์ error
    message: "รหัสผ่านไม่ตรงกัน",
  });

export default function ProfileForm() {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const storedUsername = localStorage.getItem("bun_service_name");
    if (storedUsername) {
      form.setValue("username", storedUsername); // set ค่าในฟอร์ม
    }
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true); // ✅ เริ่มโหลด
      const headers = {
        Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY!)}`,
      };
      const response = await axios.put(`${API_URL}/api/user/update`, values, {
        headers: headers,
      });
      if (response.status === 200) {
        localStorage.setItem("bun_service_name", values.username);
        toast.success("อัปเดตข้อมูลสําเร็จ!");
      }
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("เกิดข้อผิดพลาดในการอัปเดตข้อมูล");
    } finally {
      setIsLoading(false); // ✅ หยุดโหลด ไม่ว่าจะสำเร็จหรือไม่
    }
  }

  return (
    <div className="container max-w-2xl py-10">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">โปรไฟล์ของฉัน</CardTitle>
          <CardDescription>
            จัดการข้อมูลส่วนตัวและการตั้งค่าบัญชีของคุณ
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid gap-4">
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

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="grid gap-2">
                      <div className="flex justify-between items-center">
                        <FormLabel htmlFor="password">Password</FormLabel>
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
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem className="grid gap-2">
                      <div className="flex justify-between items-center">
                        <FormLabel htmlFor="confirmPassword">
                          ยืนยัน Password
                        </FormLabel>
                      </div>
                      <FormControl>
                        <PasswordInput
                          field={field}
                          id="confirmPassword"
                          placeholder="******"
                          autoComplete="current-password"
                          disabled={isLoading} // ✅ ปิดช่องระหว่างโหลด
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full mt-4"
                  disabled={isLoading}
                >
                  {isLoading ? "กำลังบันทึก..." : "บันทึกการเปลี่ยนแปลง"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
