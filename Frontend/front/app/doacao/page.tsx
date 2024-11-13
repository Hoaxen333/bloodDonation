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
import AddDoacao from '@/components/AddDoacao'



const page = () => {
    interface Doador{
        id: any,
        nome: string,
        bi: string,
        nacionalidade:string
        date: string,
        tipoSanguineo: string,
        disponiblidade: boolean
        peso: number
    }
    interface Hospital{
        id: any,
        nome: string,
        localizacao: string,
        contacto:string
    }
    interface Doacao{
        id: any,
        date:any,
        doador:Doador,
        hospital:Hospital,
    }
    const [doacoes,setDoacoes] = useState<Doacao[]>([])

    useEffect(()=>{
        fetch("http://localhost:8080/api/doacao")
        .then(doacoes=>doacoes.json())
        .then(c_doacoes=>setDoacoes(c_doacoes));
    },[]);
  return (
    <div>
        <SidebarProvider >
            <AppSidebar/>
            <main className='flex gap-1 p-2'>
                <SidebarTrigger />
                <div className='p-4 flex flex-col gap-10'>
                    <div className='flex items-center gap-2'>
                        <h2 className='font-bold text-4xl font-mono text-red-400'>Doador</h2>
                        <Input className='h-[25px]'></Input>
                        <AddDoacao icon={<SquarePlus className=' text-red-400 cursor-pointer' size={32}  />} doacoes={doacoes} setDoacoes={setDoacoes} />
                    </div>
                    
                    <div className='w-fit border-2 rounded-lg'>
                        <Table className='lg:w-[720px]'>
                            <TableCaption className=''>Lista dos Doadores</TableCaption>
                            <TableHeader>
                                <TableRow className='gap-2'>
                                    <TableHead className='text-center  text-red-400'>Id</TableHead>
                                    <TableHead className='text-center w-[200px] text-red-400'>Nome Hospital</TableHead>
                                    <TableHead className='text-center  text-red-400'>Nome Doador</TableHead>
                                    <TableHead className='text-center  text-red-400'>Tipo</TableHead>
                                
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {doacoes.map((doacao) => (
                                <TableRow key={doacao.id} className='gap-2'>
                                    <TableCell className="font-medium text-center bg-red-100">{doacao.id}</TableCell>
                                    <TableCell className='text-center w-[200px] text-xs bg-red-200'>{doacao.hospital.nome}</TableCell>
                                    <TableCell className='text-center text-xs bg-red-300'>{doacao.doador.nome}</TableCell>
                                    <TableCell className='text-center text-xs font-bold bg-red-400 text-red-900'>{doacao.doador.tipoSanguineo}</TableCell>
                                </TableRow>
                                ))}
                            </TableBody>
                            
                        </Table>
                    </div>
                </div>
            </main>
        </SidebarProvider>
    </div>
  )
}

export default page