import React from 'react';
import Head from 'next/head';
import getConfig from 'next/config';
import GoogleMap from '../components/GoogleMap';

const Home = () => {
  const [searchTerm, setSearchTerm] = React.useState(null);
  const [results, setResults] = React.useState([]);
  const { publicRuntimeConfig } = getConfig();

  const onSubmit = async e => {
    e.preventDefault();
    const resp = await fetch(
      `https://api.data.gov/ed/collegescorecard/v1/schools.json?api_key=${publicRuntimeConfig.API_KEY}&school.name=${searchTerm}&fields=id,school.name,school.school_url,location,latest.student.size`
    );
    const data = await resp.json();

    setResults(data.results);
  };

  return (
    <div>
      <Head>
        <title>College Lookup - Entera Code Challenge</title>
        <meta name="description" content="College Lookup - Entera Code Challenge" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="p-4">
        <h1 className="text-4xl text-center py-4">College Lookup</h1>

        <form className="w-full flex flex-col" onSubmit={onSubmit}>
          <input
            type="text"
            placeholder="College Name"
            className="border-[1px] rounded-[5px] w-full text-3xl p-2"
            onChange={e => setSearchTerm(e.target.value)}
          />
          <button type="submit" className="rounded-[5px] p-3 bg-blue-500 text-white mt-2 mr-0 ml-auto w-fit">
            Search
          </button>
        </form>

        {results.length > 0 && (
          <div className="w-full flex">
            <div className="w-1/4">
              {results.map((result, idx) => (
                <div key={result['id']} className="flex flex-row p-3 border-b-2 border-blue-500">
                  <div className="mx-2 mt-2 rounded-[50%] bg-black text-white text-lg min-w-[25px] h-[25px] flex justify-center">
                    {idx + 1}
                  </div>
                  <div>
                    <h2 className="text-2xl">{result['school.name']}</h2>
                    <p className="text-xs">Student Body Size: {result['latest.student.size']}</p>
                    <p className="text-xs">
                      <a href={result['school.school_url']} className="underline">
                        School Website
                      </a>
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <GoogleMap results={results} />
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;
