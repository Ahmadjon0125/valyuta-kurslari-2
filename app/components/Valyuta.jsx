'use client'
import { Table } from "antd";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

function useValyuta() {
  return useQuery({
    queryKey: ['valyuta'],
    queryFn: async () => {
      const res = await axios.get('https://cbu.uz/uz/arkhiv-kursov-valyut/json/')
      return res.data
    }
  })
}

const getFlagUrl = (currencyCode) => {
  const map = {
    USD: 'us', EUR: 'eu', RUB: 'ru', GBP: 'gb',
    JPY: 'jp', CHF: 'ch', KZT: 'kz'
  }
  const countryCode = map[currencyCode]
  return countryCode ? `https://flagcdn.com/w40/${countryCode}.png` : null;
}


function ValyutaList() {
  const { data, isLoading, isError } = useValyuta()

  if (isLoading) return <p>Yuklanmoqda...</p>
  if (isError) return <p>Xatolik yuz berdi!</p>

  const filteredData = data.filter(items => getFlagUrl(items.Ccy))
  const columns = [
    {
      title: <span className="font-bold text-gray-400 ">Валюта</span>,
      key: 'Ccy',
      render: (record) => (
        <>
          <div className="flex items-center gap-3  max-w-28" >
            {getFlagUrl(record.Ccy) && (
              <img className="rounded-full" src={getFlagUrl(record.Ccy)} alt={record.Ccy} width={25} height={25} />
            )}
            <div>
              <div>{record.Ccy}</div>
              <div className="text-gray-400 font-bold">{record.CcyNm_RU}</div>
            </div>
          </div>
        </>
      )
    },
    {
      title: <span className="font-bold text-gray-400 ">Покупка</span>,
      dataIndex: 'Rate',
      key: 'Rate',
      render: (text) => <div className="font-bold ">{text}</div>
    },
    {
      title: <span className="font-bold text-gray-400 ">Продажа</span>,
      dataIndex: 'Rate',
      key: 'Rate',
      render: (text, record) => (
        <div className="font-bold">
          {(Number(text) + Number(record.Diff)).toFixed(2)}
        </div>
      )
    }
  ];


  return (
    <div>
      <Table dataSource={filteredData} columns={columns} rowKey="Ccy" pagination={false} scroll={{ x: "max-content" }} />
    </div>
  );
}

export default ValyutaList