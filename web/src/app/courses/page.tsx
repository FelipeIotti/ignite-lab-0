import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { getClient } from "@/graphql/lib/apollo-client";
import { applicants } from "@/shared/constants/applicants";
import { dateFormatter } from "@/shared/constants/date-formater";
import { gql } from "@apollo/client";
import { CalendarIcon } from "@heroicons/react/24/outline";
import Head from "next/head";
import Link from "next/link";

const query = gql`
  query Me {
    me {
      enrollments {
        id
        createdAt

        course {
          title
          slug
        }
      }
    }
  }
`;

export default async function Courses() {
  const client = await getClient();
  const { data } = await client.query({ query });

  return (
    <>
      <Head>
        <title>Meus cursos</title>
        <link rel="shortcut icon" href="favicon.png" type="image/png" />
      </Head>

      <div className="bg-white">
        <div className="relative overflow-hidden bg-gray-50">
          <Header />
          <main className="py-20 max-w-7xl mx-auto ">
            <div className="text-center mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:px-8 lg:max-w-7xl">
              <h2 className="text-base font-semibold tracking-wider text-cyan-600 uppercase">
                Estudar
              </h2>
              <p className="mt-2 text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">
                Meus cursos
              </p>
            </div>

            <div className="bg-white shadow overflow-hidden sm:rounded-md mt-8">
              <ul role="list" className="divide-y divide-gray-200">
                {data?.me.enrollments.map((enrollment) => (
                  <li key={enrollment.id}>
                    <div className="px-4 py-4 flex items-center sm:px-6">
                      <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
                        <div className="truncate">
                          <div className="flex text-sm">
                            <p className="font-medium text-indigo-600 truncate">
                              {enrollment.course.title}
                            </p>
                            <p className="ml-1 flex-shrink-0 font-normal text-gray-500">
                              em Programação
                            </p>
                          </div>
                          <div className="mt-2 flex">
                            <div className="flex items-center text-sm text-gray-500">
                              <CalendarIcon
                                className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                                aria-hidden="true"
                              />
                              <p>
                                Turma inicia em{" "}
                                <time dateTime={enrollment.createdAt}>
                                  {dateFormatter.format(
                                    new Date(enrollment.createdAt)
                                  )}
                                </time>
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="mt-4 flex-shrink-0 sm:mt-0 sm:ml-5">
                          <div className="flex overflow-hidden -space-x-1">
                            {applicants.map((applicant) => (
                              <img
                                key={applicant.email}
                                className="inline-block h-6 w-6 rounded-full ring-2 ring-white"
                                src={applicant.imageUrl}
                                alt={applicant.name}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="ml-5 flex-shrink-0">
                        <Link href={`/courses/${enrollment.course.slug}`}>
                          <p className="px-2 py-1 border border-transparent text-base font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700">
                            Assistir aulas
                          </p>
                        </Link>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </main>
          <Footer />
        </div>
      </div>
    </>
  );
}
