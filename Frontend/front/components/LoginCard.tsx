"use client"
import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from './ui/label'
import { toast } from '@/hooks/use-toast'

const formSchema = z.object({
    username: z.string().min(2,{
        message: "Username must be at least 2 characters.",
    }).max(30),
    password: z.string().min(5).max(20),
})

export const LoginCard = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          username: "",
          password: "",
        },
      })
    function onSubmit(values: z.infer<typeof formSchema>) {
      fetch("http://localhost:8080/api/responsavel/login",{
        method:'POST',
        body:JSON.stringify(values),
        headers:{
            'Content-type':'application/json',
            'Accept':'application/json'
        }
      })
      .then(retorno=>retorno.json())
      .then(retorno_convertido=>{
        if(retorno_convertido.mensagem !== undefined){
          toast({
            variant:"destructive",
            title: "Falha!",
            description: "Erro ao efectuar Login !",
          })
        }
        else{
            toast({
              title: "Sucesso!",
              description: "Login efectuado com sucesso!",
            })
          }
        })
      }

  return (
    <div className='w-[350px] h-fit px-3 py-10 border-[2px] border-red-400 gap-5 rounded-sm'>
        <Label className='text-2xl text-center font-bold text-red-400'>Login</Label>
        <Form {...form} >
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='font-bold text-red-400'>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="tony.stark" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='font-bold text-red-400'>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="peter123" type='password' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className='bg-red-400'>Submit</Button>
          </form>
        </Form>
    </div>
  )
}
