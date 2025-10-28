import * as React from 'react';
import {
  Title,
  Card,
  CardBody,
  CardHeader,
  Button,
  Stack,
  StackItem,
  PageSection,
  PageSectionVariants,
  TextContent,
  Text,
  SearchInput,
  Badge
} from '@patternfly/react-core';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from '@patternfly/react-table';
import { MinusCircleIcon } from '@patternfly/react-icons';

interface Repository {
  id: string;
  name: string;
  url: string;
  architecture: string;
  version: string;
  packages: number;
  status: string;
}

const mockRepositories: Repository[] = [
  {
    id: '1',
    name: 'Selected Repository',
    url: 'https://dl.fedoraproject.org/pub/epel/',
    architecture: 'x86_64',
    version: '8',
    packages: 15000,
    status: 'Active'
  },
  {
    id: '2',
    name: 'Selected Repository',
    url: 'https://internal.company.com/repos/',
    architecture: 'x86_64',
    version: '8',
    packages: 2500,
    status: 'Active'
  },
  {
    id: '3',
    name: 'Selected Repository',
    url: 'https://mirror.stream.centos.org/',
    architecture: 'x86_64',
    version: '9',
    packages: 12000,
    status: 'Active'
  },
  {
    id: '4',
    name: 'Selected Repository',
    url: 'https://cdn.redhat.com/content/dist/rhel8/',
    architecture: 'x86_64',
    version: '8',
    packages: 18000,
    status: 'Active'
  },
  {
    id: '5',
    name: 'Selected Repository',
    url: 'https://rpmfusion.org/',
    architecture: 'x86_64',
    version: '9',
    packages: 20000,
    status: 'Active'
  }
];

const allRepositories: Repository[] = [
  ...mockRepositories,
  {
    id: '6',
    name: 'RPM Fusion',
    url: 'https://rpmfusion.org/',
    architecture: 'x86_64',
    version: '9',
    packages: 20000,
    status: 'Inactive'
  }
];

export const FastFoodModalLayout: React.FunctionComponent = () => {
  const [selectedRepositories, setSelectedRepositories] = React.useState<Set<string>>(
    new Set(mockRepositories.map(r => r.id))
  );
  const [searchTerm, setSearchTerm] = React.useState('');

  const handleRemove = (repoId: string) => {
    setSelectedRepositories(prev => {
      const newSet = new Set(prev);
      newSet.delete(repoId);
      return newSet;
    });
  };

  const filteredRepositories = selectedRepositories.size > 0
    ? mockRepositories.filter(repo => selectedRepositories.has(repo.id))
    : [];

  const searchResults = searchTerm
    ? allRepositories.filter(repo =>
        repo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        repo.url.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const columns = [
    { title: 'Name' },
    { title: 'Architecture' },
    { title: 'Version' },
    { title: 'Packages' },
    { title: 'Status' },
    { title: 'Actions' }
  ];

  return (
    <PageSection variant={PageSectionVariants.light}>
      <Stack hasGutter>
        <StackItem>
          <Card>
            <CardBody>
              <TextContent>
                <Title headingLevel="h1" size="2xl">
                  Custom repositories
                </Title>
                <Text component="p">
                  Select the linked custom repositories from which you can add packages to the image.
                </Text>
              </TextContent>
            </CardBody>
          </Card>
        </StackItem>

        <StackItem>
          <Card>
            <CardBody>
              <Stack hasGutter>
                <StackItem>
                  <Text component="strong">Search repositories</Text>
                </StackItem>
                <StackItem>
                  <SearchInput
                    placeholder="Search repositories..."
                    value={searchTerm}
                    onChange={(_event, value) => setSearchTerm(value)}
                    onClear={() => setSearchTerm('')}
                  />
                </StackItem>
                {searchTerm && searchResults.length > 0 && (
                  <StackItem>
                    <Card isCompact>
                      <CardBody>
                        <Stack hasGutter>
                          {searchResults.map(repo => {
                            const isSelected = selectedRepositories.has(repo.id);
                            return (
                              <StackItem key={repo.id}>
                                <Stack>
                                  <StackItem isFilled>
                                    <TextContent>
                                      <Text component="strong">{repo.name}</Text>
                                      <Text component="p">{repo.url}</Text>
                                    </TextContent>
                                  </StackItem>
                                  <StackItem>
                                    {isSelected ? (
                                      <Badge>✓ Added</Badge>
                                    ) : (
                                      <Button
                                        variant="primary"
                                        isSmall
                                        onClick={() => setSelectedRepositories(prev => new Set([...prev, repo.id]))}
                                      >
                                        + Add
                                      </Button>
                                    )}
                                  </StackItem>
                                </Stack>
                              </StackItem>
                            );
                          })}
                        </Stack>
                      </CardBody>
                    </Card>
                  </StackItem>
                )}
              </Stack>
            </CardBody>
          </Card>
        </StackItem>

        <StackItem>
          <Card>
            <CardBody>
              <Table aria-label="Repositories table">
                <Thead>
                  <Tr>
                    {columns.map((column, index) => (
                      <Th key={index}>{column.title}</Th>
                    ))}
                  </Tr>
                </Thead>
                <Tbody>
                  {filteredRepositories.length === 0 ? (
                    <Tr>
                      <Td colSpan={6}>
                        <Text>No repositories selected</Text>
                      </Td>
                    </Tr>
                  ) : (
                    filteredRepositories.map(repo => (
                      <Tr key={repo.id}>
                        <Td dataLabel={columns[0].title}>
                          <Stack>
                            <StackItem>
                              <Text component="strong">{repo.name}</Text>
                            </StackItem>
                            <StackItem>
                              <Text component="a" href={repo.url} target="_blank" rel="noopener noreferrer">
                                {repo.url}
                              </Text>
                            </StackItem>
                          </Stack>
                        </Td>
                        <Td dataLabel={columns[1].title}>{repo.architecture}</Td>
                        <Td dataLabel={columns[2].title}>{repo.version}</Td>
                        <Td dataLabel={columns[3].title}>
                          {repo.packages.toLocaleString()}
                        </Td>
                        <Td dataLabel={columns[4].title}>
                          <Badge>{repo.status}</Badge>
                        </Td>
                        <Td dataLabel={columns[5].title}>
                          <Button
                            variant="plain"
                            onClick={() => handleRemove(repo.id)}
                            icon={<MinusCircleIcon />}
                            aria-label={`Remove ${repo.name}`}
                          />
                        </Td>
                      </Tr>
                    ))
                  )}
                </Tbody>
              </Table>
            </CardBody>
          </Card>
        </StackItem>
      </Stack>
    </PageSection>
  );
};
