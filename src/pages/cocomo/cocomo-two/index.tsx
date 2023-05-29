import React, { useState } from 'react';
import { Button, Dialog, DialogBody, DialogFooter, DialogHeader, Input } from "@material-tailwind/react";
import Navigation from '@/components/navBar';

const CosteoCocomoII = () => {
  const [linesOfCode, setLinesOfCode] = useState('');
  const [open, setOpen] = useState(false);
  const [effort, setEffort] = useState('');
  const [duration, setDuration] = useState('');
  const [cost, setCost] = useState('');
  const handleOpen = () => setOpen(!open);

  const calculateCost = () => {
    const kLOC = parseFloat(linesOfCode);
    const a = 2.4; // Constante de ajuste del esfuerzo
    const b = 1.05; // Constante de ajuste de la duración
    const c = 3.0; // Constante de ajuste del costo

    const calculatedEffort = a * Math.pow(kLOC, b); // Cálculo del esfuerzo
    const calculatedDuration = c * Math.pow(calculatedEffort, b); // Cálculo de la duración
    const calculatedCost = calculatedEffort * 1000; // Cálculo del costo (asumiendo un costo por unidad de esfuerzo de 1000)

    setEffort(calculatedEffort.toFixed(2));
    setDuration(calculatedDuration.toFixed(2));
    setCost(calculatedCost.toFixed(2));
    handleOpen();
  };

  return (
    <div className="min-h-screen w-full bg-gray-100 text-black">
      <Navigation />
      <div className="container flex flex-col justify-center pt-10">
        <span className="text-center font-bold text-2xl w-full">Modelo COCOMO I</span>
        <p className="text-justify text-lg pt-5">
          Modelo que permite estimar el costo, esfuerzo, y programar la hora de planificar una nueva actividad de desrrollo de software.
        </p>
      </div>
      <div className="flex flex-col justify-center container gap-5 pt-10">
        <Input
          type="number"
          label="Líneas de código estimadas (KLOC):"
          id="linesOfCode"
          value={linesOfCode}
          onChange={(e) => setLinesOfCode(e.target.value)}
        />
        <Button color="orange" onClick={calculateCost}>Calcular costo</Button>
        <Dialog open={open} handler={handleOpen}>
          <DialogHeader>Resultados</DialogHeader>
          <DialogBody divider id='modalBody' className='flex flex-col'>
            {effort && duration && cost && (
              <div>
                <h3>Resultados:</h3>
                <p>Esfuerzo estimado: {effort} Personas-Mes</p>
                <p>Duración estimada: {duration} Meses</p>
                <p>Costo estimado: ${cost}</p>
              </div>
            )}
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
    </div>
  );
};

export default CosteoCocomoII;
