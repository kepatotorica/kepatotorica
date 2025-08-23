"use client"
import { Card, CardBody, Input, Link } from "@nextui-org/react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Game } from "./Game"
import { PlayStationTwoGames } from "./systems/SonyPlayStation2"

export default function RomsPage() {
  const { theme } = useTheme()
  const [search, setSearch] = useState("")
  const [debouncedSearch, setDebouncedSearch] = useState(search)
  const [matches, setMatches] = useState<Game[]>([])

  const [headerRowColor, setHeaderRowColor] = useState("bg-gray-950")
      useEffect(() => {
        setHeaderRowColor(theme === "dark" ? "bg-gray-950" : "bg-gray-100")
    }, [theme])

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search)
    }, 500)

    return () => {
      clearTimeout(handler)
    }
  }, [search])


  useEffect(() => {
    console.log("Debounced search changed: " + debouncedSearch)
    setMatches(PlayStationTwoGames.filter(game => game.title.replaceAll(" ", "").includes(debouncedSearch.replaceAll(" ", ""))))
  }, [debouncedSearch])

  const navigateToRom = (title: string) => {
    open(`https://myrient.erista.me/files/Redump/Sony%20-%20PlayStation%202/?filter=${title.replaceAll(" ", "+")}`)
  }

  return (
    <div>
      <div className='text-2xl p-10 text-center'>
        Search for <span className={"text-orange-400"}>roms</span>  here, roms provided by <Link className={"text-orange-400"} href={"https://myrient.erista.me/donate/"}>Myrient</Link>
      </div>


      <div className='text-xs p-10 text-center'>
        This is WIP and only supports some PS2 games currently.
      </div>

      <Input
        label="Rom Search"
        name="Rom Search"
        placeholder="Search for a rom here!"
        type="string"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      <Card className="mt-5">
                <CardBody>
                    <table className="table-auto w-full">
                        <thead>
                            <tr className={headerRowColor}>
                                <th
                                    className="text-left cursor-pointer"
                                    // onClick={() => handleSort('name')}
                                >
                                  Title
                                    {/* Name {sortConfig.key === 'name' && (sortConfig.direction === 'asc' ? '▲' : '▼')} */}
                                </th>
                                <th
                                    className="text-left cursor-pointer"
                                    // onClick={() => handleSort('name')}
                                >
                                  Size
                                    {/* Name {sortConfig.key === 'name' && (sortConfig.direction === 'asc' ? '▲' : '▼')} */}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {matches.map((match, index) => (
                                <tr key={index} className={theme === "dark" ? "hover:bg-blue-500" : "hover:bg-blue-200"} onClick={_ => navigateToRom(match.title)}>
                                    <td className="">{match.title}</td>
                                    <td className="">{match.size}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </CardBody>
            </Card>
    </div>
  )
}
