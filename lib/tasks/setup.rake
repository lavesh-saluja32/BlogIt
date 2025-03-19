desc 'Populates the database with sample organization data in production'
task setup: [:environment] do
  create_sample_organizations!
  puts "Sample organization data has been added."
end

def create_sample_organizations!
  puts 'Seeding with sample organizations...'
  create_organization! name: 'Tech Corp'
  create_organization! name: 'Startup Inc'
  create_organization! name: 'OpenAI'
  puts 'Done! Organizations have been created.'
end

def create_organization!(options = {})
  Organization.find_or_create_by!(options)
end
