import ValyutaList from "./components/Valyuta"

const date = new Date()
export default function HomePage() {
    return (
        <main className="pt-15 bg-gray-100">
            <div className="max-w-2xl mx-auto p-3 rounded bg-white rounded-2xl">
                <div className="flex my-6">
                    <h2 className="font-extrabold mr-4">Курс валют</h2>
                    <p className="text-gray-400 font-bold">{ date.toLocaleDateString('ru-RU')}</p>
                </div>
              <ValyutaList />
              <p className="my-5 text-gray-500">* Курсы могут отличаться в момент обмена. Точный курс обмена будет определен на момент совершения операции</p>
            </div>
        </main>
    )
}

