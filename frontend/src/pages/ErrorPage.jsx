

import imagen_1 from '../img/imagen_error.jpg'
export const ErrorPage = () => {
  
   return(
    <div className="min-h-screen bg-[url('../img/imagen_error.jpg')] bg-cover bg-center flex items-center justify-center bg-gradient-to-r from-sky-200 via-blue-100 to-gray-100 bg-[#116CA2]">

 <div class="bg-white  shadow-2xl rounded-2xl p-4  gap-y-50 text-center max-w-2xl ">
  <h1 class="text-9xl font-extrabold text-red-600"> 404 </h1>
  <h2 class="text-3xl font-bold text-gray-800 mt-4">Página no encontrada</h2>
  <p class="text-gray-600 mt-2">
      Estás en una página incorrecta😢.
  </p>
  <a href="/" 
     class="inline-block mt-6 px-6 py-3 bg-white text-blue-600 font-semibold rounded-xl shadow-md ">
    <h2> 🔙 Volver al inicio</h2>
  </a>
</div>
</div>
  )
}
