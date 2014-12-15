json.array!(@posts) do |person|
  json.extract! person, :id
  json.url person_url(person, format: :json)
end