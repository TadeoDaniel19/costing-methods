import Navigation from '@/components/navBar';
import {
  Button, Input,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import React, { useState } from 'react';

interface CostoDirecto {
  centroResponsabilidad: string;
  costoDirecto: number;
}

interface CostoIndirecto {
  centroResponsabilidad: string;
  costoIndirecto: number;
}

const CosteoRCA: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [costosDirectos, setCostosDirectos] = useState<CostoDirecto[]>([
    { centroResponsabilidad: 'Centro 1', costoDirecto: 5000.0 },
    { centroResponsabilidad: 'Centro 2', costoDirecto: 10000.0 },
    { centroResponsabilidad: 'Centro 3', costoDirecto: 15000.0 },
  ]);

  const [costosIndirectos, setCostosIndirectos] = useState<CostoIndirecto[]>([
    { centroResponsabilidad: 'Centro 1', costoIndirecto: 2000.0 },
    { centroResponsabilidad: 'Centro 2', costoIndirecto: 4000.0 },
    { centroResponsabilidad: 'Centro 3', costoIndirecto: 6000.0 },
  ]);

  const [unidadesActividad, setUnidadesActividad] = useState(1000.0);
  const handleOpen = () => setOpen(!open);
  const calcularCostosTotales = (): { centroResponsabilidad: string; costoTotal: number }[] => {

    const costoTotalIndirectos = costosIndirectos.reduce(
      (total, costoIndirecto) => total + costoIndirecto.costoIndirecto,
      0
    );

    const tasaCostoIndirecto = costoTotalIndirectos / unidadesActividad;

    const costosTotales = costosDirectos.map((costoDirecto) => {
      const costoIndirecto = costosIndirectos.find(
        (ci) => ci.centroResponsabilidad === costoDirecto.centroResponsabilidad
      );

      const costoTotal =
        costoDirecto.costoDirecto +
        (tasaCostoIndirecto *
          unidadesActividad *
          (costoIndirecto!.costoIndirecto / costoTotalIndirectos));

      return {
        centroResponsabilidad: costoDirecto.centroResponsabilidad,
        costoTotal,
      };
    });
    return costosTotales;
  };

  const costosTotales = calcularCostosTotales();

  const handleCostoDirectoChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ): void => {
    const value = parseFloat(e.target.value);
    setCostosDirectos((prevCostosDirectos) =>
      prevCostosDirectos.map((cd, i) =>
        i === index ? { ...cd, costoDirecto: value } : cd
      )
    );
  };

  const handleCostoIndirectoChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ): void => {
    const value = parseFloat(e.target.value);
    setCostosIndirectos((prevCostosIndirectos) =>
      prevCostosIndirectos.map((ci, i) =>
        i === index ? { ...ci, costoIndirecto: value } : ci
      )
    );
  };

  return (
    <div className="min-h-screen w-full bg-gray-100 text-black">
      <Navigation />
      <div className='px-5 py-8 flex flex-col justify-center container'>
        <span className="text-center font-bold text-2xl w-full pt-1 ">Costeo RCA</span>
        <span className="text-center font-bold text-xl w-full">Costos Directos</span>
        {costosDirectos.map((costoDirecto, index) => (
          <div key={index}>
            <span className='text-center font-semibold text-base w-full'>Centro de responsabilidad: {costoDirecto.centroResponsabilidad}</span>
            <Input
              color='orange'
              type="number"
              value={costoDirecto.costoDirecto}
              onChange={(e) => handleCostoDirectoChange(e, index)}
            />
          </div>
        ))}

        <span className="text-center font-bold text-xl w-full">Costos Indirectos</span>
        {costosIndirectos.map((costoIndirecto, index) => (
          <div key={index}>
            <span className='text-center font-semibold text-base w-full'>Centro de responsabilidad: {costoIndirecto.centroResponsabilidad}</span>
            <Input
              color='orange'
              type="number"
              value={costoIndirecto.costoIndirecto}
              onChange={(e) => handleCostoIndirectoChange(e, index)}
            />
          </div>
        ))}
        <div className='flex flex-col justify-center gap-3 pb-3'>
          <span className="text-center font-bold text-xl w-full">Unidades de Actividad</span>
          <Input
            color='orange'
            type="number"
            value={unidadesActividad}
            onChange={(e) => setUnidadesActividad(parseFloat(e.target.value))}
          />

        </div>
        <Button color='orange' className="" onClick={() => {
          setOpen(true);
        }}>Calcular</Button>

      </div>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Resultados</DialogHeader>
        <DialogBody divider id='modalBody' className='flex flex-col'>
          {costosTotales.map((costoTotal, index) => (
            <div key={index}>
              <span>
                El costo total del {costoTotal.centroResponsabilidad} es de ${costoTotal.costoTotal}
              </span>
            </div>
          ))}
        </DialogBody>
        <DialogFooter className='gap-3 flex justify-center'>
          <Button variant="gradient" color="orange" onClick={() => {
            handleOpen();
          }}>
            <span>Cerrar</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
};

export default CosteoRCA;