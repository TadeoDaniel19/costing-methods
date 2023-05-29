import Navigation from '@/components/navBar';
import { Button, Dialog, DialogBody, DialogFooter, DialogHeader, Input } from "@material-tailwind/react";
import React, { useState } from 'react';

const CosteoTDABC = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);
  const [costosFijos, setCostosFijos] = useState([
    { actividad: "Actividad 1", costo: 400 },
    { actividad: "Actividad 2", costo: 300 },
    { actividad: "Actividad 3", costo: 300 }
  ]);

  const [costosVariables, setCostosVariables] = useState([
    { actividad: "Actividad 1", costo: 300 },
    { actividad: "Actividad 2", costo: 300 },
    { actividad: "Actividad 3", costo: 300 }
  ]);

  const [tiemposEstándar, setTiemposEstándar] = useState([
    { actividad: "Actividad 1", tiempo: 300 },
    { actividad: "Actividad 2", tiempo: 300 },
    { actividad: "Actividad 3", tiempo: 300 }
  ]);

  const [tiemposReales, setTiemposReales] = useState([
    { actividad: "Actividad 1", tiempo: 300 },
    { actividad: "Actividad 2", tiempo: 300 },
    { actividad: "Actividad 3", tiempo: 300 }
  ]);

  const [costosTotales, setCostosTotales] = useState([]);

  const calcularCostosTotales = () => {
    const tasasCostosVariables = costosVariables.map((costoVariable: any) => {
      const { actividad, costo } = costoVariable;
      const { tiempo }: any = tiemposEstándar.find((t) => t.actividad === actividad);
      const tasaCostoVariable = parseFloat(costo) / parseFloat(tiempo);
      return { actividad, tasaCostoVariable };
    });

    const costosTotalesCalculados = costosFijos.map((costoFijo) => {
      const { actividad, costo: costoFijoValue } = costoFijo;
      const { tiempo: tiempoReal }: any = tiemposReales.find((t) => t.actividad === actividad);
      const { tasaCostoVariable }: any = tasasCostosVariables.find((t) => t.actividad === actividad);
      const costoVariable = parseFloat(tasaCostoVariable) * parseFloat(tiempoReal);
      const costoTotal = parseFloat(costoFijoValue as any) + parseFloat(costoVariable as any);
      setOpen(true);
      return { actividad, costoTotal };
    });

    setCostosTotales(costosTotalesCalculados as any);
  };

  return (
    <div className='min-h-screen w-full bg-gray-100 text-black'>
      <Navigation />
      <div className='container flex flex-col justify-center pt-10 pb-10'>
        <span className="text-center font-bold text-2xl w-full">Costeo TDABC</span>
        <span className="text-left font-semibold text-xl w-full">Costos Fijos</span>
        {costosFijos.map((costoFijo, index) => (
          <div key={index} className="p-3">
            <div className='py-2'>
              <Input
                label="Actividad"
                color="orange"
                type="text"
                value={costoFijo.actividad}
                onChange={(e) => {
                  const updatedCostosFijos = [...costosFijos];
                  updatedCostosFijos[index].actividad = e.target.value;
                  setCostosFijos(updatedCostosFijos);
                }}
              />
            </div>
            <Input
              label="Costo"
              color="orange"
              type="number"
              value={costoFijo.costo}
              onChange={(e) => {
                const updatedCostosFijos = [...costosFijos];
                updatedCostosFijos[index].costo = parseFloat(e.target.value);
                setCostosFijos(updatedCostosFijos);
              }}
            />
          </div>
        ))}
        <span className="text-left font-semibold text-xl w-full">Costos Variables</span>
        {costosVariables.map((costoVariable, index) => (
          <div key={index} className="p-3">
            <div className='py-2'>
              <Input
                color="orange"
                label="Actividad"
                type="text"
                value={costoVariable.actividad}
                onChange={(e) => {
                  const updatedCostosVariables = [...costosVariables];
                  updatedCostosVariables[index].actividad = e.target.value;
                  setCostosVariables(updatedCostosVariables);
                }}
              />
            </div>
            <Input
              type="number"
              color="orange"
              label="Costo"
              value={costoVariable.costo}
              onChange={(e) => {
                const updatedCostosVariables = [...costosVariables];
                updatedCostosVariables[index].costo = parseFloat(e.target.value);
                setCostosVariables(updatedCostosVariables);
              }}
            />
          </div>
        ))}
        <span className="text-left font-semibold text-xl w-full">Tiempos Estándar</span>
        {tiemposEstándar.map((tiempoEstándar, index) => (
          <div key={index} className="p-3">
            <div className='py-2'>
              <Input
                label="Actividad"
                type="text"
                color="orange"
                value={tiempoEstándar.actividad}
                onChange={(e) => {
                  const updatedTiemposEstándar = [...tiemposEstándar];
                  updatedTiemposEstándar[index].actividad = e.target.value;
                  setTiemposEstándar(updatedTiemposEstándar);
                }}
              />
            </div>
            <Input
              label="Tiempo"
              color="orange"
              type="number"
              value={tiempoEstándar.tiempo}
              onChange={(e) => {
                const updatedTiemposEstándar = [...tiemposEstándar];
                updatedTiemposEstándar[index].tiempo = parseFloat(e.target.value);
                setTiemposEstándar(updatedTiemposEstándar);
              }}
            />
          </div>
        ))}
        <span className="text-left font-semibold text-xl w-full">Tiempos Reales</span>
        {tiemposReales.map((tiempoReal, index) => (
          <div key={index} className="p-3">
            <div className='py-2'>
              <Input
                color="orange"
                label="Actividad"
                type="text"
                value={tiempoReal.actividad}
                onChange={(e) => {
                  const updatedTiemposReales = [...tiemposReales];
                  updatedTiemposReales[index].actividad = e.target.value;
                  setTiemposReales(updatedTiemposReales);
                }}
              />
            </div>
            <Input
              label="Tiempo"
              color="orange"
              type="number"
              value={tiempoReal.tiempo}
              onChange={(e) => {
                const updatedTiemposReales = [...tiemposReales];
                updatedTiemposReales[index].tiempo = parseFloat(e.target.value);
                setTiemposReales(updatedTiemposReales);
              }}
            />
          </div>
        ))}
        <Button color="orange" onClick={calcularCostosTotales}>Calcular Costos Totales</Button>
      </div>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Resultados</DialogHeader>
        <DialogBody divider id='modalBody' className='flex flex-col'>
          {costosTotales.map((costoTotal: any, index) => (
            <p key={index}>
              El costo total de la {costoTotal.actividad} es de ${costoTotal.costoTotal}
            </p>
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

export default CosteoTDABC;
