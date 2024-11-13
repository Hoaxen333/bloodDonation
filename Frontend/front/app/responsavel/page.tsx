'use client'
import React from 'react'
import { AppSidebar } from '@/components/AppSidebar'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { useState,useEffect } from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  import { SquarePen,Trash,Check,Ban, SquarePlus, Icon} from 'lucide-react';
import { Input } from '@/components/ui/input'
import { toast } from '@/hooks/use-toast'
import AddInventario from '@/components/AddResponsavel'


const page = () => {
    interface Responsavel{
        id: any,
        nome: string,
        apelido: string,
        username:string,
        password:string,
        email:string,
        hospital:Hospital,
    }
    interface Hospital{
        id: any,
        nome: string,
        localizacao: string,
        contacto:string
    }
    // UseState
    const [responsaveis,setResponsaveis] = useState<Responsavel[]>([]);

    //UseEffect
    useEffect(()=>{
        fetch(`http://localhost:8080/api/responsavel`)
        .then(responsaveis=>responsaveis.json())
        .then(c_responsaveis=>setResponsaveis(c_responsaveis));
    },[]);
  return (
    <div>
        <SidebarProvider >
            <AppSidebar/>
            <main className='flex gap-1 p-2'>
                <SidebarTrigger />
                <div className='p-4 flex flex-col gap-10'>
                    <div className='flex items-center gap-2'>
                        <h2 className='font-bold text-4xl font-mono text-red-400'>Hospital</h2>
                        <Input className='h-[25px]'></Input>
                        <AddInventario icon={<SquarePlus className=' text-red-400 cursor-pointer' size={32}  />} responsaveis={responsaveis} setResponsaveis={setResponsaveis} />
                    </div>
                    
                    <div className='w-fit border-2 rounded-lg'>
                        <Table className='lg:w-[920px] '>
                            <TableCaption className=''>Lista dos Doadores</TableCaption>
                            <TableHeader>
                                <TableRow className='gap-2'>
                                    <TableHead className='text-center  text-red-400'>Id</TableHead>
                                    <TableHead className='text-center w-[200px] text-red-400'>Nome</TableHead>
                                    <TableHead className='text-center  text-red-400'>Hospital</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {responsaveis.map((responsavel) => (
                                <TableRow key={responsavel.id} className='gap-2'>
                                    <TableCell className="font-medium text-center bg-red-100">{responsavel.id}</TableCell>
                                    <TableCell className='text-center w-[200px] text-xs bg-red-200'>{responsavel.nome} {responsavel.apelido}</TableCell>
                                    <TableCell className='text-center text-xs bg-red-300'>{responsavel.hospital.nome}</TableCell>
                                </TableRow>
                                ))}
                            </TableBody>
                            <TableFooter>
                                <TableRow>
                                
                                </TableRow>
                            </TableFooter>
                        </Table>
                    </div>
                </div>
            </main>
        </SidebarProvider>
    </div>
  )
}

export default page