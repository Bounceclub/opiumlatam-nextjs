import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Términos y Servicios - OpiumLATAM',
  description: 'Términos y condiciones de uso de OpiumLATAM - Noticias de Hip-Hop en español para Latinoamérica',
};

export default function TerminosPage() {
  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-[var(--bg2)] rounded-lg p-8 border border-[var(--border)]">
          <h1 className="text-3xl sm:text-4xl font-bold text-[var(--head)] mb-8">
            Términos y Condiciones de Uso
          </h1>

          <div className="prose prose-invert max-w-none text-[var(--text)]">
            <p className="text-[var(--text2)] mb-8">
              Última actualización: {new Date().toLocaleDateString('es-ES', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[var(--head)] mb-4">1. Aceptación de los Términos</h2>
              <p className="text-[var(--text2)] mb-4">
                Al acceder y usar opiumlatam.com, aceptas estos términos y condiciones de uso. Si no estás de acuerdo con estos términos, por favor no uses nuestro sitio web.
              </p>
              <p className="text-[var(--text2)]">
                Nos reservamos el derecho de modificar estos términos en cualquier momento. El uso continuado del sitio después de dichos cambios constituye tu aceptación de los nuevos términos.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[var(--head)] mb-4">2. Descripción del Servicio</h2>
              <p className="text-[var(--text2)] mb-4">
                OpiumLATAM es un sitio web de noticias y contenido relacionado con el hip-hop, música urbana y cultura latinoamericana. Nuestros servicios incluyen:
              </p>
              <ul className="list-disc pl-6 text-[var(--text2)] mb-4 space-y-2">
                <li>Noticias y actualizaciones del mundo del hip-hop</li>
                <li>Reseñas de álbumes y canciones</li>
                <li>Información sobre eventos y conciertos</li>
                <li>Discusiones y análisis de la cultura urbana</li>
                <li>Newsletter con contenido curado</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[var(--head)] mb-4">3. Uso Aceptable</h2>
              <p className="text-[var(--text2)] mb-4">
                Al usar nuestro sitio, aceptas no:
              </p>
              <ul className="list-disc pl-6 text-[var(--text2)] mb-4 space-y-2">
                <li>Usar el sitio para cualquier propósito ilegal</li>
                <li>Copiar, reproducir o distribuir nuestro contenido sin permiso</li>
                <li>Intentar obtener acceso no autorizado a nuestros sistemas</li>
                <li>Interferir con el funcionamiento del sitio</li>
                <li>Publicar contenido ofensivo, discriminatorio o inapropiado</li>
                <li>Spam o enviar mensajes no solicitados</li>
                <li>Recopilar información de otros usuarios sin su consentimiento</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[var(--head)] mb-4">4. Propiedad Intelectual</h2>
              <p className="text-[var(--text2)] mb-4">
                Todo el contenido de OpiumLATAM, incluyendo但不限于:
              </p>
              <ul className="list-disc pl-6 text-[var(--text2)] mb-4 space-y-2">
                <li>Artículos y noticias</li>
                <li>Imágenes y gráficos</li>
                <li>Videos y multimedia</li>
                <li>Logos y marcas registradas</li>
                <li>Diseño del sitio web</li>
                <li>Código y software</li>
              </ul>
              <p className="text-[var(--text2)]">
                está protegido por derechos de autor y otras leyes de propiedad intelectual. No puedes usar nuestro contenido sin nuestro permiso explícito por escrito.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[var(--head)] mb-4">5. Contenido de Terceros</h2>
              <p className="text-[var(--text2)] mb-4">
                Nuestro sitio puede contener enlaces a sitios web de terceros y contenido de terceros. No somos responsables del contenido, políticas de privacidad o prácticas de estos terceros.
              </p>
              <p className="text-[var(--text2)]">
                El uso de enlaces a terceros es bajo tu propio riesgo. Recomendamos revisar los términos y condiciones de cada sitio antes de usarlo.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[var(--head)] mb-4">6. Comentarios y Contenido Generado por Usuarios</h2>
              <p className="text-[var(--text2)] mb-4">
                Los usuarios pueden publicar comentarios y otros contenido en nuestro sitio. Al hacerlo, aceptas que:
              </p>
              <ul className="list-disc pl-6 text-[var(--text2)] mb-4 space-y-2">
                <li>Eres el único responsable del contenido que publicas</li>
                <li>Tienes derecho a publicar ese contenido</li>
                <li>El contenido no viola derechos de terceros</li>
                <li>El contenido es apropiado y no ofensivo</li>
              </ul>
              <p className="text-[var(--text2)]">
                Nos reservamos el derecho de eliminar cualquier contenido que consideremos inapropiado, violatorio de estos términos o ilegal.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[var(--head)] mb-4">7. Limitación de Responsabilidad</h2>
              <p className="text-[var(--text2)] mb-4">
                En la máxima medida permitida por la ley, OpiumLATAM no será responsable por:
              </p>
              <ul className="list-disc pl-6 text-[var(--text2)] mb-4 space-y-2">
                <li>Daños directos, indirectos, incidentales o consecuentes</li>
                <li>Pérdida de datos o información</li>
                <li>Interrupciones del servicio</li>
                <li>Errores o inexactitudes en el contenido</li>
                <li>Daños causados por virus o malware</li>
                <li>Problemas técnicos del sitio web</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[var(--head)] mb-4">8. Disponibilidad del Servicio</h2>
              <p className="text-[var(--text2)] mb-4">
                Nos esforzamos por mantener el sitio disponible y funcionando correctamente. Sin embargo:
              </p>
              <ul className="list-disc pl-6 text-[var(--text2)] mb-4 space-y-2">
                <li>No garantizamos que el servicio esté disponible en todo momento</li>
                <li>Podemos suspender el servicio por mantenimiento</li>
                <li>No somos responsables por interrupciones temporales</li>
                <li>Podemos modificar o descontinuar el servicio sin previo aviso</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[var(--head)] mb-4">9. Enlaces a Sitios de Terceros</h2>
              <p className="text-[var(--text2)] mb-4">
                Nuestro sitio puede contener enlaces a sitios web de terceros. Estos enlaces son proporcionados para tu conveniencia y no implicamos aprobación del contenido de esos sitios.
              </p>
              <p className="text-[var(--text2)]">
                No somos responsables del contenido, políticas de privacidad o prácticas de sitios de terceros. El uso de estos enlaces es bajo tu propio riesgo.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[var(--head)] mb-4">10. Modificaciones del Servicio</h2>
              <p className="text-[var(--text2)]">
                Nos reservamos el derecho de modificar, suspender o descontinuar cualquier aspecto del servicio en cualquier momento sin previo aviso. No seremos responsables ante ti ni ante terceros por cualquier modificación, suspensión o descontinuación del servicio.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[var(--head)] mb-4">11. Ley Aplicable y Jurisdicción</h2>
              <p className="text-[var(--text2)]">
                Estos términos se regirán por las leyes de los países donde operamos. Cualquier disputa relacionada con estos términos será resuelta en los tribunales competentes de nuestra jurisdicción.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[var(--head)] mb-4">12. Indemnización</h2>
              <p className="text-[var(--text2)]">
                Aceptas indemnizar y mantener indemne a OpiumLATAM, sus directores, empleados y afiliados de cualquier reclamo, demanda, daño, pérdida o gasto (incluyendo honorarios legales) que surja de tu uso del sitio o violación de estos términos.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[var(--head)] mb-4">13. Renuncia</h2>
              <p className="text-[var(--text2)]">
                El incumplimiento de cualquier disposición de estos términos no constituirá una renuncia a dicha disposición. Cualquier renuncia a una disposición será efectiva solo si está por escrito y firmada por nosotros.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[var(--head)] mb-4">14. Separabilidad</h2>
              <p className="text-[var(--text2)]">
                Si alguna disposición de estos términos es considerada inválida o inaplicable por un tribunal competente, las demás disposiciones permanecerán en pleno vigor y efecto.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[var(--head)] mb-4">15. Acuerdo Completo</h2>
              <p className="text-[var(--text2)]">
                Estos términos constituyen el acuerdo completo entre tú y OpiumLATAM con respecto al uso del sitio y reemplazan todos los acuerdos previos, comunicaciones y propuestas.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[var(--head)] mb-4">16. Contacto</h2>
              <p className="text-[var(--text2)] mb-4">
                Si tienes preguntas sobre estos términos y condiciones, contáctanos:
              </p>
              <div className="bg-[var(--bg3)] p-4 rounded-lg border border-[var(--border)]">
                <p className="text-[var(--text)] mb-2">
                  <strong>Email:</strong> latamopium@gmail.com
                </p>
                <p className="text-[var(--text)] mb-2">
                  <strong>Sitio Web:</strong> https://opiumlatam.com
                </p>
                <p className="text-[var(--text)]">
                  <strong>Ubicación:</strong> Latinoamérica
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}