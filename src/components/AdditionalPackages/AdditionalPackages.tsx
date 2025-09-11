import * as React from 'react';
import {
  Title,
  SearchInput,
  Button,
  ButtonVariant,
  ToggleGroup,
  ToggleGroupItem,
  Pagination,
  PaginationVariant,
  Nav,
  NavList,
  NavItem,
  Checkbox,
  Tabs,
  Tab,
  TabTitleText,
  Alert,
  AlertVariant,
  Spinner,
  FormGroup,
  FormSelect,
  FormSelectOption
} from '@patternfly/react-core';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from '@patternfly/react-table';
import { RepositoryIcon, PackageIcon, MinusCircleIcon, PlusCircleIcon } from '@patternfly/react-icons';

// Mock data types
interface Package {
  name: string;
  summary: string;
  repository: 'included' | 'other';
  source: 'Red Hat Repository' | 'Third Party Repository';
}

interface Repository {
  id: string;
  name: string;
  url: string;
  arch: string;
  version: string;
  packages: number;
  status: string;
}

// Mock data for demonstration
const includedRepoPackages: Package[] = [
  { name: 'httpd', summary: 'Apache HTTP Server', repository: 'included', source: 'Red Hat Repository' },
  { name: 'nginx', summary: 'High performance web server', repository: 'included', source: 'Third Party Repository' },
  { name: 'postgresql', summary: 'PostgreSQL database server', repository: 'included', source: 'Red Hat Repository' },
  { name: 'docker', summary: 'Docker container runtime', repository: 'included', source: 'Third Party Repository' },
  { name: 'ansible', summary: 'IT automation tool', repository: 'included', source: 'Red Hat Repository' },
  { name: 'git', summary: 'Version control system', repository: 'included', source: 'Red Hat Repository' },
  { name: 'vim', summary: 'Vi IMproved text editor', repository: 'included', source: 'Red Hat Repository' },
  { name: 'wget', summary: 'Retrieve files from the web', repository: 'included', source: 'Red Hat Repository' },
  { name: 'curl', summary: 'Transfer data from or to a server', repository: 'included', source: 'Red Hat Repository' },
  { name: 'python3', summary: 'Python 3 programming language', repository: 'included', source: 'Red Hat Repository' },
  { name: 'ssh', summary: 'Secure Shell client and server', repository: 'included', source: 'Red Hat Repository' },
  { name: 'systemd', summary: 'System and service manager', repository: 'included', source: 'Red Hat Repository' },
  { name: 'sudo', summary: 'Execute command as superuser', repository: 'included', source: 'Red Hat Repository' },
  { name: 'sed', summary: 'Stream editor for filtering text', repository: 'included', source: 'Red Hat Repository' },
  { name: 'screen', summary: 'Terminal multiplexer', repository: 'included', source: 'Red Hat Repository' },
  { name: 'strace', summary: 'Trace system calls and signals', repository: 'included', source: 'Red Hat Repository' },
  { name: 'samba', summary: 'SMB/CIFS file and print server', repository: 'included', source: 'Third Party Repository' },
  { name: 'snmp', summary: 'Simple Network Management Protocol', repository: 'included', source: 'Red Hat Repository' },
  { name: 'squid', summary: 'Web proxy cache', repository: 'included', source: 'Third Party Repository' },
  { name: 'sendmail', summary: 'Mail transfer agent', repository: 'included', source: 'Red Hat Repository' },
  { name: 'apache', summary: 'Apache web server', repository: 'included', source: 'Red Hat Repository' },
  { name: 'bind', summary: 'Berkeley Internet Name Domain', repository: 'included', source: 'Red Hat Repository' },
  { name: 'bash', summary: 'Bourne Again Shell', repository: 'included', source: 'Red Hat Repository' },
  { name: 'busybox', summary: 'Multi-call binary', repository: 'included', source: 'Third Party Repository' },
  { name: 'bc', summary: 'Arbitrary precision calculator', repository: 'included', source: 'Red Hat Repository' },
  { name: 'bzip2', summary: 'Block-sorting file compressor', repository: 'included', source: 'Red Hat Repository' },
  { name: 'buildah', summary: 'Container image builder', repository: 'included', source: 'Red Hat Repository' },
  { name: 'cron', summary: 'Daemon for executing scheduled commands', repository: 'included', source: 'Red Hat Repository' },
  { name: 'cups', summary: 'Common Unix Printing System', repository: 'included', source: 'Red Hat Repository' },
  { name: 'clamav', summary: 'Antivirus software', repository: 'included', source: 'Third Party Repository' },
  { name: 'cryptsetup', summary: 'Disk encryption setup utility', repository: 'included', source: 'Red Hat Repository' },
  { name: 'dhcpd', summary: 'DHCP server daemon', repository: 'included', source: 'Red Hat Repository' },
  { name: 'dnsmasq', summary: 'Lightweight DNS forwarder', repository: 'included', source: 'Third Party Repository' },
  { name: 'dovecot', summary: 'IMAP and POP3 server', repository: 'included', source: 'Third Party Repository' },
  { name: 'fail2ban', summary: 'Intrusion prevention software', repository: 'included', source: 'Third Party Repository' },
  { name: 'Selected Package 1', summary: 'Selected Package', repository: 'included', source: 'Red Hat Repository' },
  { name: 'freeradius', summary: 'RADIUS server', repository: 'included', source: 'Third Party Repository' },
  { name: 'gcc', summary: 'GNU Compiler Collection', repository: 'included', source: 'Red Hat Repository' },
  { name: 'glibc', summary: 'GNU C Library', repository: 'included', source: 'Red Hat Repository' },
  { name: 'gnupg', summary: 'GNU Privacy Guard', repository: 'included', source: 'Red Hat Repository' },
  { name: 'haproxy', summary: 'Load balancer and proxy', repository: 'included', source: 'Third Party Repository' },
  { name: 'httpd-tools', summary: 'Apache HTTP Server tools', repository: 'included', source: 'Red Hat Repository' },
  { name: 'iptables', summary: 'Linux packet filtering', repository: 'included', source: 'Red Hat Repository' },
  { name: 'java', summary: 'Java Runtime Environment', repository: 'included', source: 'Red Hat Repository' },
  { name: 'kernel', summary: 'Linux kernel', repository: 'included', source: 'Red Hat Repository' },
  { name: 'libvirt', summary: 'Virtualization library', repository: 'included', source: 'Red Hat Repository' },
  { name: 'logrotate', summary: 'Log file rotation utility', repository: 'included', source: 'Red Hat Repository' },
  { name: 'mariadb', summary: 'Database server', repository: 'included', source: 'Third Party Repository' },
  { name: 'memcached', summary: 'Memory caching daemon', repository: 'included', source: 'Third Party Repository' },
  { name: 'nagios', summary: 'Network monitoring system', repository: 'included', source: 'Third Party Repository' },
  { name: 'netcat', summary: 'Network utility', repository: 'included', source: 'Red Hat Repository' },
  { name: 'Selected Package 2', summary: 'Selected Package', repository: 'included', source: 'Red Hat Repository' },
  { name: 'openvpn', summary: 'VPN solution', repository: 'included', source: 'Third Party Repository' },
  { name: 'php', summary: 'PHP scripting language', repository: 'included', source: 'Third Party Repository' },
  { name: 'podman', summary: 'Container engine', repository: 'included', source: 'Red Hat Repository' },
  { name: 'qemu', summary: 'Machine emulator and virtualizer', repository: 'included', source: 'Red Hat Repository' },
  { name: 'redis', summary: 'In-memory data structure store', repository: 'included', source: 'Third Party Repository' },
  { name: 'Selected Package 3', summary: 'Selected Package', repository: 'included', source: 'Red Hat Repository' },
  { name: 'rpm', summary: 'RPM Package Manager', repository: 'included', source: 'Red Hat Repository' },
  { name: 'Selected Package 4', summary: 'Selected Package', repository: 'included', source: 'Red Hat Repository' },
  { name: 'tcpdump', summary: 'Network packet analyzer', repository: 'included', source: 'Red Hat Repository' },
  { name: 'tmux', summary: 'Terminal multiplexer', repository: 'included', source: 'Third Party Repository' },
  { name: 'unzip', summary: 'Extract files from ZIP archives', repository: 'included', source: 'Red Hat Repository' },
  { name: 'varnish', summary: 'HTTP accelerator', repository: 'included', source: 'Third Party Repository' },
  { name: 'wireshark', summary: 'Network protocol analyzer', repository: 'included', source: 'Third Party Repository' },
  { name: 'xinetd', summary: 'Extended Internet Services daemon', repository: 'included', source: 'Red Hat Repository' },
  { name: 'yum', summary: 'Package manager', repository: 'included', source: 'Red Hat Repository' },
  { name: 'zsh', summary: 'Z shell', repository: 'included', source: 'Red Hat Repository' },
];

const otherRepoPackages: Package[] = [
  { name: 'epel-release', summary: 'Extra Packages for Enterprise Linux', repository: 'other', source: 'Red Hat Repository' },
  { name: 'elasticsearch', summary: 'Distributed search and analytics engine', repository: 'other', source: 'Third Party Repository' },
  { name: 'kibana', summary: 'Data visualization and exploration platform', repository: 'other', source: 'Third Party Repository' },
  { name: 'logstash', summary: 'Data processing pipeline', repository: 'other', source: 'Third Party Repository' },
  { name: 'grafana', summary: 'Metrics visualization and alerting', repository: 'other', source: 'Third Party Repository' },
  { name: 'prometheus', summary: 'Monitoring system and time series database', repository: 'other', source: 'Third Party Repository' },
  { name: 'nodejs', summary: 'JavaScript runtime built on Chrome V8', repository: 'other', source: 'Third Party Repository' },
  { name: 'npm', summary: 'Node.js package manager', repository: 'other', source: 'Third Party Repository' },
  { name: 'ruby', summary: 'Object-oriented programming language', repository: 'other', source: 'Red Hat Repository' },
  { name: 'gems', summary: 'Ruby package manager', repository: 'other', source: 'Red Hat Repository' },
  { name: 'go', summary: 'Go programming language', repository: 'other', source: 'Third Party Repository' },
  { name: 'rust', summary: 'Systems programming language', repository: 'other', source: 'Third Party Repository' },
  { name: 'cargo', summary: 'Rust package manager', repository: 'other', source: 'Third Party Repository' },
  { name: 'terraform', summary: 'Infrastructure as code tool', repository: 'other', source: 'Third Party Repository' },
  { name: 'packer', summary: 'Machine image creation tool', repository: 'other', source: 'Third Party Repository' },
  { name: 'vagrant', summary: 'Development environment manager', repository: 'other', source: 'Third Party Repository' },
  { name: 'chef', summary: 'Configuration management tool', repository: 'other', source: 'Red Hat Repository' },
  { name: 'puppet', summary: 'Configuration management platform', repository: 'other', source: 'Red Hat Repository' },
  { name: 'salt', summary: 'Infrastructure management tool', repository: 'other', source: 'Third Party Repository' },
  { name: 'jenkins', summary: 'Automation server', repository: 'other', source: 'Third Party Repository' },
  { name: 'gitlab', summary: 'Git repository management', repository: 'other', source: 'Third Party Repository' },
  { name: 'jira', summary: 'Issue and project tracking', repository: 'other', source: 'Third Party Repository' },
  { name: 'confluence', summary: 'Team collaboration software', repository: 'other', source: 'Third Party Repository' },
  { name: 'bitbucket', summary: 'Git code hosting service', repository: 'other', source: 'Third Party Repository' },
  { name: 'sonarqube', summary: 'Code quality and security platform', repository: 'other', source: 'Third Party Repository' },
  { name: 'nexus', summary: 'Repository manager', repository: 'other', source: 'Red Hat Repository' },
  { name: 'artifactory', summary: 'Binary repository manager', repository: 'other', source: 'Third Party Repository' },
  { name: 'maven', summary: 'Build automation tool', repository: 'other', source: 'Red Hat Repository' },
  { name: 'gradle', summary: 'Build automation tool', repository: 'other', source: 'Third Party Repository' },
  { name: 'ant', summary: 'Build tool', repository: 'other', source: 'Red Hat Repository' },
  { name: 'make', summary: 'Build automation tool', repository: 'other', source: 'Red Hat Repository' },
  { name: 'cmake', summary: 'Cross-platform build system', repository: 'other', source: 'Third Party Repository' },
  { name: 'ninja', summary: 'Small build system', repository: 'other', source: 'Third Party Repository' },
  { name: 'bazel', summary: 'Build system', repository: 'other', source: 'Third Party Repository' },
  { name: 'buck', summary: 'Build system', repository: 'other', source: 'Third Party Repository' },
  { name: 'pants', summary: 'Build system', repository: 'other', source: 'Third Party Repository' },
  { name: 'please', summary: 'Build system', repository: 'other', source: 'Third Party Repository' },
  { name: 'scons', summary: 'Build system', repository: 'other', source: 'Red Hat Repository' },
  { name: 'waf', summary: 'Build system', repository: 'other', source: 'Third Party Repository' },
  { name: 'meson', summary: 'Build system', repository: 'other', source: 'Third Party Repository' },
  { name: 'autotools', summary: 'Build system', repository: 'other', source: 'Red Hat Repository' },
  { name: 'conan', summary: 'Package manager', repository: 'other', source: 'Third Party Repository' },
  { name: 'vcpkg', summary: 'Package manager', repository: 'other', source: 'Third Party Repository' },
  { name: 'spack', summary: 'Package manager', repository: 'other', source: 'Third Party Repository' },
  { name: 'conda', summary: 'Package manager', repository: 'other', source: 'Third Party Repository' },
  { name: 'pip', summary: 'Package manager', repository: 'other', source: 'Third Party Repository' },
  { name: 'gem', summary: 'Package manager', repository: 'other', source: 'Red Hat Repository' },
  { name: 'cpan', summary: 'Package manager', repository: 'other', source: 'Third Party Repository' },
  { name: 'cabal', summary: 'Package manager', repository: 'other', source: 'Third Party Repository' },
  { name: 'stack', summary: 'Package manager', repository: 'other', source: 'Third Party Repository' },
  { name: 'nuget', summary: 'Package manager', repository: 'other', source: 'Third Party Repository' },
  { name: 'chocolatey', summary: 'Package manager', repository: 'other', source: 'Third Party Repository' },
  { name: 'scoop', summary: 'Package manager', repository: 'other', source: 'Third Party Repository' },
  { name: 'winget', summary: 'Package manager', repository: 'other', source: 'Third Party Repository' },
  { name: 'homebrew', summary: 'Package manager', repository: 'other', source: 'Third Party Repository' },
  { name: 'apt', summary: 'Package manager', repository: 'other', source: 'Red Hat Repository' },
  { name: 'dnf', summary: 'Package manager', repository: 'other', source: 'Red Hat Repository' },
  { name: 'zypper', summary: 'Package manager', repository: 'other', source: 'Third Party Repository' },
  { name: 'pacman', summary: 'Package manager', repository: 'other', source: 'Third Party Repository' },
  { name: 'xbps', summary: 'Package manager', repository: 'other', source: 'Third Party Repository' },
  { name: 'nix', summary: 'Package manager', repository: 'other', source: 'Third Party Repository' },
  { name: 'guix', summary: 'Package manager', repository: 'other', source: 'Third Party Repository' },
  { name: 'flatpak', summary: 'Package manager', repository: 'other', source: 'Third Party Repository' },
  { name: 'snap', summary: 'Package manager', repository: 'other', source: 'Third Party Repository' },
  { name: 'appimage', summary: 'Package manager', repository: 'other', source: 'Third Party Repository' },
  { name: 'rpm', summary: 'Package manager', repository: 'other', source: 'Red Hat Repository' },
  { name: 'dpkg', summary: 'Package manager', repository: 'other', source: 'Third Party Repository' },
  { name: 'pkg', summary: 'Package manager', repository: 'other', source: 'Third Party Repository' },
  { name: 'brew', summary: 'Package manager', repository: 'other', source: 'Third Party Repository' },
  { name: 'port', summary: 'Package manager', repository: 'other', source: 'Third Party Repository' },
  { name: 'fink', summary: 'Package manager', repository: 'other', source: 'Third Party Repository' },
  { name: 'macports', summary: 'Package manager', repository: 'other', source: 'Third Party Repository' },
  { name: 'pkgsrc', summary: 'Package manager', repository: 'other', source: 'Third Party Repository' },
  { name: 'slackpkg', summary: 'Package manager', repository: 'other', source: 'Third Party Repository' },
  { name: 'slapt-get', summary: 'Package manager', repository: 'other', source: 'Third Party Repository' },
  { name: 'swaret', summary: 'Package manager', repository: 'other', source: 'Third Party Repository' },
  { name: 'netpkg', summary: 'Package manager', repository: 'other', source: 'Third Party Repository' },
  { name: 'pkgtool', summary: 'Package manager', repository: 'other', source: 'Third Party Repository' },
  { name: 'slackpkg', summary: 'Package manager', repository: 'other', source: 'Third Party Repository' },
  { name: 'slapt-get', summary: 'Package manager', repository: 'other', source: 'Third Party Repository' },
  { name: 'swaret', summary: 'Package manager', repository: 'other', source: 'Third Party Repository' },
  { name: 'netpkg', summary: 'Package manager', repository: 'other', source: 'Third Party Repository' },
  { name: 'pkgtool', summary: 'Package manager', repository: 'other', source: 'Third Party Repository' },
];

// Package recommendations data - full pool of recommendations
const allPackageRecommendations: Package[] = [
  { name: 'htop', summary: 'Interactive process viewer', repository: 'recommended', source: 'Red Hat Repository' },
  { name: 'tree', summary: 'Display directory structure as a tree', repository: 'recommended', source: 'Red Hat Repository' },
  { name: 'jq', summary: 'Command-line JSON processor', repository: 'recommended', source: 'Red Hat Repository' },
  { name: 'vim', summary: 'Vi IMproved text editor', repository: 'recommended', source: 'Red Hat Repository' },
  { name: 'git', summary: 'Version control system', repository: 'recommended', source: 'Red Hat Repository' },
  { name: 'curl', summary: 'Transfer data from or to a server', repository: 'recommended', source: 'Red Hat Repository' },
  { name: 'wget', summary: 'Retrieve files from the web', repository: 'recommended', source: 'Red Hat Repository' },
  { name: 'unzip', summary: 'Extract files from ZIP archives', repository: 'recommended', source: 'Red Hat Repository' }
];

const mockRepositories: Repository[] = [
  { id: 'repo1', name: 'Selected Repository', url: 'https://dl.fedoraproject.org/pub/epel/', arch: 'x86_64', version: '8', packages: 15000, status: 'Active' },
  { id: 'repo2', name: 'RPM Fusion', url: 'https://rpmfusion.org/', arch: 'x86_64', version: '8', packages: 8000, status: 'Active' },
  { id: 'repo3', name: 'Selected Repository', url: 'https://internal.company.com/repos/', arch: 'x86_64', version: '8', packages: 2500, status: 'Active' },
  { id: 'repo4', name: 'Selected Repository', url: 'https://mirror.stream.centos.org/', arch: 'x86_64', version: '9', packages: 12000, status: 'Active' },
  { id: 'repo5', name: 'Fedora Rawhide', url: 'https://download.fedoraproject.org/pub/fedora/linux/development/rawhide/', arch: 'x86_64', version: '40', packages: 25000, status: 'Active' },
  { id: 'repo6', name: 'Selected Repository', url: 'https://cdn.redhat.com/content/dist/rhel8/', arch: 'x86_64', version: '8', packages: 18000, status: 'Active' },
  { id: 'repo7', name: 'Selected Repository', url: 'https://cdn.redhat.com/content/dist/rhel9/', arch: 'x86_64', version: '9', packages: 20000, status: 'Active' },
  { id: 'repo8', name: 'AlmaLinux 8', url: 'https://repo.almalinux.org/almalinux/8/', arch: 'x86_64', version: '8', packages: 16000, status: 'Active' },
  { id: 'repo9', name: 'Rocky Linux 8', url: 'https://download.rockylinux.org/pub/rocky/8/', arch: 'x86_64', version: '8', packages: 15000, status: 'Active' },
  { id: 'repo10', name: 'Oracle Linux 8', url: 'https://yum.oracle.com/repo/OracleLinux/OL8/', arch: 'x86_64', version: '8', packages: 14000, status: 'Active' },
];

export const AdditionalPackages: React.FunctionComponent = () => {
  // State for packages
  const [searchTerm, setSearchTerm] = React.useState('');
  const [toggleSelected, setToggleSelected] = React.useState<'toggle-available' | 'toggle-selected'>('toggle-available');
  const [page, setPage] = React.useState(1);
  const [perPage, setPerPage] = React.useState(10);
  const [selectedPackages, setSelectedPackages] = React.useState<Set<string>>(new Set(['Selected Package 1', 'Selected Package 2', 'Selected Package 3', 'Selected Package 4']));
  const [activeTabKey, setActiveTabKey] = React.useState('included-repos');
  const [hasViewedSelected, setHasViewedSelected] = React.useState(false);
  const [hasViewedPackagesSelected, setHasViewedPackagesSelected] = React.useState(false);

  // State for repositories
  const [selectedRepositories, setSelectedRepositories] = React.useState<Set<string>>(new Set(['repo1', 'repo3', 'repo4', 'repo6', 'repo7']));
  const [reposToggleSelected, setReposToggleSelected] = React.useState<'toggle-repos-all' | 'toggle-repos-selected'>('toggle-repos-all');
  const [hasViewedReposSelected, setHasViewedReposSelected] = React.useState(false);

  // State for step management
  const [showAsOneStep, setShowAsOneStep] = React.useState(false);
  const [activeStep, setActiveStep] = React.useState('custom-repositories');
  const [enableToggles, setEnableToggles] = React.useState(true);
  const [enableCheckboxes, setEnableCheckboxes] = React.useState(true);
  const [searchInDropdown, setSearchInDropdown] = React.useState(false);
  const [otherReposEnabled, setOtherReposEnabled] = React.useState(true);
  const [searchingInOtherRepos, setSearchingInOtherRepos] = React.useState(false);
  const [isLoadingOtherRepos, setIsLoadingOtherRepos] = React.useState(false);
  const [groupSearchEnabled, setGroupSearchEnabled] = React.useState(false);
  const [packageTypeFilter, setPackageTypeFilter] = React.useState<'individual' | 'group'>('individual');
  const [addedRecommendations, setAddedRecommendations] = React.useState<Set<string>>(new Set());
  const [showRecommendations, setShowRecommendations] = React.useState(true);
  const [showSearchRecommendations, setShowSearchRecommendations] = React.useState(false);
  const [obscureNames, setObscureNames] = React.useState(false);

  // Computed values for packages
  const selectedCount = selectedPackages.size;
  const totalAvailableItems = includedRepoPackages.length + otherRepoPackages.length;

  // Current recommendations (excluding already added ones)
  const currentRecommendations = React.useMemo(() => {
    return allPackageRecommendations
      .filter(pkg => !addedRecommendations.has(pkg.name))
      .slice(0, 3); // Show only 3 recommendations at a time
  }, [addedRecommendations]);

  // Search recommendations (shown when starting a search and Package Recommendations toggle is OFF)
  const searchRecommendations = React.useMemo(() => {
    return allPackageRecommendations
      .filter(pkg => !addedRecommendations.has(pkg.name))
      .slice(0, 3); // Show only 3 recommendations at a time
  }, [addedRecommendations]);

  // Filter packages for dropdown (only when searchInDropdown is enabled)
  const dropdownFilteredPackages = React.useMemo(() => {
    if ((!searchInDropdown && !searchingInOtherRepos) || !searchTerm) {
      return [];
    }
    
    // When searching in other repos, search in both included and other repo packages
    let sourcePackages;
    if (searchingInOtherRepos) {
      sourcePackages = [...includedRepoPackages, ...otherRepoPackages];
    } else {
      sourcePackages = activeTabKey === 'included-repos' ? includedRepoPackages : otherRepoPackages;
    }
    
    return sourcePackages.filter(pkg => {
      if (searchingInOtherRepos) {
        // For demo purposes, show exact match when searching in other repos
        return pkg.name.toLowerCase() === searchTerm.toLowerCase();
      } else {
        const nameMatch = pkg.name.toLowerCase().startsWith(searchTerm.toLowerCase());
        return nameMatch;
      }
    });
  }, [searchTerm, activeTabKey, searchInDropdown, searchingInOtherRepos]);

  // Filter packages for main table
  const filteredPackages = React.useMemo(() => {
    console.log('🔍 Package Filtering Debug:', {
      toggleSelected,
      searchTerm,
      activeTabKey,
      selectedPackages: Array.from(selectedPackages),
      selectedPackagesSize: selectedPackages.size
    });
    // When searching in other repos, show selected packages from both repositories
    if (searchingInOtherRepos) {
      const allPackages = [...includedRepoPackages, ...otherRepoPackages];
      const selectedPkgs = allPackages.filter(pkg => selectedPackages.has(pkg.name));
      // Sort to show packages from other repos first (newly added ones)
      return selectedPkgs.sort((a, b) => {
        const aIsOther = a.repository === 'other';
        const bIsOther = b.repository === 'other';
        if (aIsOther && !bIsOther) return -1;
        if (!aIsOther && bIsOther) return 1;
        return 0;
      });
    }
    
    const sourcePackages = activeTabKey === 'included-repos' ? includedRepoPackages : otherRepoPackages;
    
    // When searchInDropdown is enabled, only show selected packages
    if (searchInDropdown) {
      return sourcePackages.filter(pkg => selectedPackages.has(pkg.name));
    } else {
      // When searchInDropdown is disabled, use original behavior
      let filtered = sourcePackages;
      
      // Apply toggle filtering first
      if (toggleSelected === 'toggle-selected') {
        filtered = filtered.filter(pkg => selectedPackages.has(pkg.name));
        if (!hasViewedPackagesSelected) {
          setHasViewedPackagesSelected(true);
        }
      }
      
      // Then apply search term filtering to the filtered results
      if (searchTerm) {
        filtered = filtered.filter(pkg => {
          const nameMatch = pkg.name.toLowerCase().startsWith(searchTerm.toLowerCase());
          return nameMatch;
        });
      }
      
      console.log('📦 Final filtered packages:', filtered.map(pkg => pkg.name));
      return filtered;
    }
  }, [searchTerm, activeTabKey, searchInDropdown, toggleSelected, selectedPackages, hasViewedPackagesSelected, searchingInOtherRepos]);

  // Paginate packages
  const paginatedPackages = React.useMemo(() => {
    const startIndex = (page - 1) * perPage;
    return filteredPackages.slice(startIndex, startIndex + perPage);
  }, [filteredPackages, page, perPage]);

  // Total items for pagination
  const totalItems = filteredPackages.length;

  // Filter repositories for dropdown (only when searchInDropdown is enabled)
  const dropdownFilteredRepositories = React.useMemo(() => {
    if (!searchInDropdown || !searchTerm) {
      return [];
    }
    
    // Determine which repositories to search in based on toggle and search state
    let repositoriesToSearch = mockRepositories;
    
    if (!otherReposEnabled && !searchingInOtherRepos) {
      // When "Other Repos" is OFF and we're not searching in other repos, only search in included repos
      repositoriesToSearch = mockRepositories.filter(repo => 
        repo.id === 'repo1' || repo.id === 'repo2' || repo.id === 'repo3'
      );
    } else if (otherReposEnabled || searchingInOtherRepos) {
      // When "Other Repos" is ON or we're searching in other repos, search in all repos
      repositoriesToSearch = mockRepositories;
    }
    
    return repositoriesToSearch.filter(repo => 
      repo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      repo.url.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, searchInDropdown, otherReposEnabled, searchingInOtherRepos]);

  // Filter repositories for main table
  const filteredRepositories = React.useMemo(() => {
    let filtered = [...mockRepositories];
    
    // When searchInDropdown is enabled, only show selected repositories
    if (searchInDropdown) {
      filtered = filtered.filter(repo => selectedRepositories.has(repo.id));
    } else {
      // When checkboxes are disabled, only show selected repositories
      if (!enableCheckboxes) {
        filtered = filtered.filter(repo => selectedRepositories.has(repo.id));
      } else {
        // When checkboxes are enabled, use original behavior
        // Apply toggle filtering first
        if (reposToggleSelected === 'toggle-repos-selected') {
          filtered = filtered.filter(repo => selectedRepositories.has(repo.id));
          if (!hasViewedReposSelected) {
            setHasViewedReposSelected(true);
          }
        }
        
        // Then apply search term filtering to the filtered results
        if (searchTerm) {
          filtered = filtered.filter(repo => 
            repo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            repo.url.toLowerCase().includes(searchTerm.toLowerCase())
          );
        }
      }
    }
    
    return filtered;
  }, [searchTerm, searchInDropdown, reposToggleSelected, selectedRepositories, hasViewedReposSelected, enableCheckboxes]);

  // Event handlers
  const handleSearch = (value: string) => {
    setSearchTerm(value);
    // Reset searching in other repos when search term changes
    if (value !== searchTerm) {
      setSearchingInOtherRepos(false);
    }
    
    // Hide search recommendations when user starts typing
    if (value) {
      setShowSearchRecommendations(false);
    }
    // Show search recommendations when clearing search (if Package Recommendations toggle is OFF)
    else if (!value && !showRecommendations) {
      setShowSearchRecommendations(true);
    }
    
    setPage(1);
  };

  const handleClear = () => {
    setSearchTerm('');
    setShowSearchRecommendations(false);
    setPage(1);
    // Note: selected packages should persist
  };

  const handleSearchFocus = () => {
    // Show search recommendations when focusing the search field (if Package Recommendations toggle is OFF)
    if (!showRecommendations) {
      setShowSearchRecommendations(true);
    }
  };

  const handleToggleChange = (event: React.MouseEvent<Element, MouseEvent> | React.KeyboardEvent<Element>, selected: boolean) => {
    // For PatternFly ToggleGroupItem, we need to handle this differently
    // The selected state tells us which button was clicked
    if (selected) {
      // This means the button was selected, so we need to determine which one
      // We'll use a different approach - create separate handlers for each button
    }
    setPage(1);
  };

  const handleAvailableToggle = () => {
    setToggleSelected('toggle-available');
    setPage(1);
  };

  const handleSelectedToggle = () => {
    setToggleSelected('toggle-selected');
    setPage(1);
  };

  const handlePackageSelect = (event: React.MouseEvent<Element, MouseEvent> | React.KeyboardEvent<Element>, selected: boolean) => {
    const packageName = event.currentTarget.getAttribute('data-package-name');
    if (packageName) {
      const newSelected = new Set(selectedPackages);
      if (selected) {
        newSelected.add(packageName);
      } else {
        newSelected.delete(packageName);
      }
      setSelectedPackages(newSelected);
    }
  };

  const handleRepositorySelect = (event: React.MouseEvent<Element, MouseEvent> | React.KeyboardEvent<Element>, selected: boolean) => {
    const repoId = event.currentTarget.getAttribute('data-repo-id');
    if (repoId) {
      const newSelected = new Set(selectedRepositories);
      if (selected) {
        newSelected.add(repoId);
      } else {
        newSelected.delete(repoId);
      }
      setSelectedRepositories(newSelected);
    }
  };

  const handleReposToggleChange = (event: React.MouseEvent<Element, MouseEvent> | React.KeyboardEvent<Element>, selected: boolean) => {
    const buttonId = event.currentTarget.getAttribute('data-button-id');
    if (buttonId === 'toggle-repos-all') {
      setReposToggleSelected('toggle-repos-all');
    } else if (buttonId === 'toggle-repos-selected') {
      setReposToggleSelected('toggle-repos-selected');
    }
  };

  const handleReposAllToggle = () => {
    setReposToggleSelected('toggle-repos-all');
  };

  const handleReposSelectedToggle = () => {
    setReposToggleSelected('toggle-repos-selected');
  };

  const handleSelectAllRepositories = (checked: boolean) => {
      if (checked) {
      // Select all filtered repositories
      const allRepoIds = filteredRepositories.map(repo => repo.id);
      setSelectedRepositories(new Set(allRepoIds));
      } else {
      // Deselect all repositories
      setSelectedRepositories(new Set());
    }
  };

  const handleRemoveRepository = (repoId: string) => {
    // Remove repository from selected set
    const newSelected = new Set(selectedRepositories);
    newSelected.delete(repoId);
      setSelectedRepositories(newSelected);
  };

  const handleRemovePackage = (packageName: string) => {
    // Remove package from selected set
    const newSelected = new Set(selectedPackages);
    newSelected.delete(packageName);
    setSelectedPackages(newSelected);
  };

  const handleAddRepository = (repo: Repository) => {
    // Add repository to selected set
    const newSelected = new Set(selectedRepositories);
    newSelected.add(repo.id);
    setSelectedRepositories(newSelected);
    
    // Clear search term but stay in current view so user can see the addition in context
    setSearchTerm('');
  };

  const handleSearchInOtherRepos = () => {
    setIsLoadingOtherRepos(true);
    // Simulate loading delay for demo purposes
    setTimeout(() => {
      setSearchingInOtherRepos(true);
      setIsLoadingOtherRepos(false);
    }, 1500);
  };

  const handleAddPackage = (pkg: Package) => {
    // Add package to selected set
    const newSelected = new Set(selectedPackages);
    newSelected.add(pkg.name);
    setSelectedPackages(newSelected);
    
    // Track that this recommendation was added
    const newAddedRecommendations = new Set(addedRecommendations);
    newAddedRecommendations.add(pkg.name);
    setAddedRecommendations(newAddedRecommendations);
    
    // Add to included repo packages if not already there
    if (!includedRepoPackages.some(existingPkg => existingPkg.name === pkg.name)) {
      // Convert recommended package to included package format
      const includedPackage: Package = {
        ...pkg,
        repository: 'included' as const
      };
      includedRepoPackages.unshift(includedPackage); // Add to beginning of array
    }
    
    // Clear search term but stay in current view so user can see the addition in context
    setSearchTerm('');
  };

  const handleStepChange = (stepId: string) => {
    setActiveStep(stepId);
  };

  // Helper function to get display name for packages
  const getPackageDisplayName = (pkg: Package) => {
    if (obscureNames) {
      // When obscuring is enabled, show generic names based on selection status
      if (selectedPackages.has(pkg.name)) {
        return 'Selected Package';
      } else {
        return 'Available Package';
      }
    } else {
      // When obscuring is disabled, show actual package names
      return pkg.name;
    }
  };

  // Helper function to get display name for repositories
  const getRepositoryDisplayName = (repo: Repository) => {
    if (obscureNames) {
      // When obscuring is enabled, show generic names based on selection status
      if (selectedRepositories.has(repo.id)) {
        return 'Selected Repository';
      } else {
        return 'Available Repository';
      }
    } else {
      // When obscuring is disabled, show actual repository names
      return repo.name;
    }
  };

  const onSetPage = (_event: React.MouseEvent<Element, MouseEvent> | React.KeyboardEvent<Element>, newPage: number) => {
    setPage(newPage);
  };

  const onPerPageSelect = (_event: React.MouseEvent<Element, MouseEvent> | React.KeyboardEvent<Element>, newPerPage: number) => {
    setPerPage(newPerPage);
    setPage(1);
  };

  // Add custom CSS for navigation styling
  React.useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .custom-nav-item {
        margin-bottom: 8px;
        border-radius: 6px;
        transition: all 0.2s ease;
        cursor: pointer;
      }

      /* Target multiple possible PatternFly v5 selectors */
      .custom-nav-item .pf-c-nav__link,
      .custom-nav-item .pf-v5-c-nav__link,
      .custom-nav-item a,
      .custom-nav-item button {
        background-color: transparent !important;
        border: none !important;
      }

      /* Active state - target multiple selectors */
      .custom-nav-item.pf-m-current .pf-c-nav__link,
      .custom-nav-item.pf-m-current .pf-v5-c-nav__link,
      .custom-nav-item.pf-m-current a,
      .custom-nav-item.pf-m-current button {
        background-color: #e7f1ff !important;
        border: 2px solid #0066cc !important;
        border-radius: 6px;
        box-shadow: 0 2px 4px rgba(0, 102, 204, 0.1);
      }

      /* Inactive state - target multiple selectors */
      .custom-nav-item:not(.pf-m-current) .pf-c-nav__link,
      .custom-nav-item:not(.pf-m-current) .pf-v5-c-nav__link,
      .custom-nav-item:not(.pf-m-current) a,
      .custom-nav-item:not(.pf-m-current) button {
        background-color: #ffffff !important;
        border: 2px solid #d1d1d1 !important;
        border-radius: 6px;
      }

      /* Nuclear option: override ALL possible PatternFly backgrounds */
      .custom-nav-item * {
        background-color: inherit !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const renderCustomRepositories = () => (
    <div style={{ padding: '20px 0' }}>
      <div style={{ marginBottom: '20px' }}>
        <Title headingLevel="h1" size="xl">
          Custom repositories
        </Title>
        <p style={{ fontSize: '1rem', color: '#666', margin: '10px 0 0 0' }}>
          Select the linked custom repositories from which you can add packages to the image
        </p>
      </div>

      {/* Toolbar with controls */}
      <div style={{ 
        margin: '20px 0', 
        display: 'flex', 
        gap: '16px', 
        alignItems: 'center', 
        flexWrap: 'wrap',
        padding: '16px'
      }}>
        <div style={{ position: 'relative' }}>
          <FormGroup 
            label={<span style={{ fontSize: '14px', fontWeight: 600 }}>Search repositories</span>} 
            fieldId="repository-search"
          >
            <div style={{ width: '300px' }}>
              <SearchInput
                placeholder="Search repositories..."
                value={searchTerm}
                onChange={(event, value) => handleSearch(value)}
                onClear={handleClear}
                aria-label="Filter repositories"
              />
            </div>
          </FormGroup>
                      {(searchInDropdown && searchTerm) || (showSearchRecommendations && !showRecommendations) ? (
            <div style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              backgroundColor: 'white',
              border: '1px solid #ccc',
              borderRadius: '4px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              maxHeight: '200px',
              overflowY: 'auto',
              zIndex: 1000
            }}>
              {dropdownFilteredRepositories.length > 0 ? (
                dropdownFilteredRepositories.slice(0, 5).map((repo) => {
                  const isAlreadySelected = selectedRepositories.has(repo.id);
                  return (
                    <div
                      key={repo.id}
                      onClick={() => !isAlreadySelected && handleAddRepository(repo)}
                      style={{
                        padding: '8px 12px',
                        cursor: isAlreadySelected ? 'not-allowed' : 'pointer',
                        borderBottom: '1px solid #f0f0f0',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        backgroundColor: isAlreadySelected ? '#f8f9fa' : 'white',
                        opacity: isAlreadySelected ? 0.6 : 1
                      }}
                      onMouseEnter={(e) => {
                        if (!isAlreadySelected) {
                          e.currentTarget.style.backgroundColor = '#f5f5f5';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isAlreadySelected) {
                          e.currentTarget.style.backgroundColor = 'white';
                        }
                      }}
                    >
                      <div>
                        <strong>{getRepositoryDisplayName(repo)}</strong>
                        <br />
                        <small style={{ color: '#666' }}>{repo.url}</small>
                      </div>
                      <span style={{ 
                        color: isAlreadySelected ? '#999' : '#0066cc', 
                        fontSize: '12px' 
                      }}>
                        {isAlreadySelected ? '✓ Added' : '+ Add'}
                      </span>
                    </div>
                  );
                })
              ) : (
                // Show "Search in Other Repos" button when no results and Other Repos is OFF
                !otherReposEnabled && !searchingInOtherRepos && (
                  <div style={{
                    padding: '12px',
                    textAlign: 'center',
                    borderBottom: '1px solid #f0f0f0'
                  }}>
                    <div style={{ 
                      color: '#666', 
                      fontSize: '14px', 
                      marginBottom: '8px' 
                    }}>
                      No repositories found in included repos
                    </div>
                    <Button
                      variant={ButtonVariant.secondary}
                      size="sm"
                      onClick={handleSearchInOtherRepos}
                      style={{
                        fontSize: '12px',
                        padding: '4px 12px'
                      }}
                    >
                      Search in Other Repos
                    </Button>
                  </div>
                )
              )}
            </div>
          ) : null}
        </div>
        
        {enableToggles && (
          <Button variant={ButtonVariant.primary}>
            Refresh
          </Button>
        )}



        {enableToggles && !searchInDropdown && (
        <ToggleGroup aria-label="Filter repositories list">
          <ToggleGroupItem
              text={`All${mockRepositories ? ` (${hasViewedReposSelected ? mockRepositories.length - selectedRepositories.size : mockRepositories.length})` : ''}`}
            aria-label="All repositories"
            buttonId="toggle-repos-all"
            isSelected={reposToggleSelected === 'toggle-repos-all'}
              onChange={() => handleReposAllToggle()}
          />
          <ToggleGroupItem
            text={`Selected${selectedRepositories.size ? ` (${selectedRepositories.size})` : ''}`}
            aria-label="Selected repositories"
            buttonId="toggle-repos-selected"
            isSelected={reposToggleSelected === 'toggle-repos-selected'}
              onChange={() => handleReposSelectedToggle()}
          />
        </ToggleGroup>
        )}
        
        {enableToggles && searchInDropdown && (
        <div style={{ color: '#666', fontSize: '14px' }}>
          Selected repositories: {selectedRepositories.size}
        </div>
        )}
      </div>

      {/* Repositories Table */}
      <Table aria-label="Custom repositories table" variant="compact">
        <Thead>
          <Tr>
            {enableCheckboxes && (
              <Th>
                <Checkbox
                  id="select-all-repos"
                  isChecked={selectedRepositories.size === filteredRepositories.length && filteredRepositories.length > 0}
                  onChange={(event, checked) => handleSelectAllRepositories(checked)}
                  aria-label="Select all repositories"
                />
              </Th>
            )}
            <Th width={45}>Name</Th>
            <Th width={15}>Architecture</Th>
            <Th>Version</Th>
            <Th width={10}>Packages</Th>
            <Th>Status</Th>
            {!enableCheckboxes && (
              <Th width={15}>Actions</Th>
            )}
          </Tr>
        </Thead>
                    <Tbody>
              {filteredRepositories.map((repo) => (
                <Tr key={repo.id}>
              {enableCheckboxes && (
                  <Td>
                    <Checkbox
                      id={repo.id}
                      isChecked={selectedRepositories.has(repo.id)}
                    onChange={(event, checked) => handleRepositorySelect(event, checked)}
                      aria-label="Select repository"
                    data-repo-id={repo.id}
                    />
                  </Td>
              )}
                  <Td>
                    <div>
                      <strong>
                        {getRepositoryDisplayName(repo)}
                      </strong>
                      <br />
                      <Button
                        component="a"
                        target="_blank"
                        variant="link"
                        isInline
                        href={repo.url}
                      >
                        {repo.url}
                      </Button>
                    </div>
                  </Td>
                  <Td>{repo.arch}</Td>
                  <Td>{repo.version}</Td>
                  <Td>{repo.packages.toLocaleString()}</Td>
                  <Td>
                    <span style={{ color: 'green' }}>{repo.status}</span>
                  </Td>
              {!enableCheckboxes && (
                <Td>
                  <Button
                    variant="plain"
                    aria-label="Remove repository"
                    onClick={() => handleRemoveRepository(repo.id)}
                    style={{ 
                      padding: '4px', 
                      minWidth: 'auto',
                      color: '#666'
                    }}
                  >
                    <MinusCircleIcon style={{ color: '#6a6e73' }} />
                  </Button>
                </Td>
              )}
                </Tr>
              ))}
            </Tbody>
      </Table>

      {/* Pagination */}
      <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end' }}>
        <Pagination
          itemCount={2}
          perPage={10}
          page={1}
          onSetPage={() => {}}
          onPerPageSelect={() => {}}
          variant={PaginationVariant.bottom}
        />
      </div>
    </div>
  );

  const renderAdditionalPackages = () => {
    return (
      <div style={{ padding: '20px 0' }}>
        
        <div style={{ marginBottom: '20px' }}>
          <Title headingLevel="h1" size="xl">
            Additional packages
          </Title>
          <p style={{ fontSize: '1rem', color: '#666', margin: '10px 0 0 0' }}>
            Blueprints created with Images include all required packages.
          </p>
        </div>
      
        {!groupSearchEnabled && (
          <Alert variant={AlertVariant.info} isInline title="Search for package groups">
            Search for package groups by starting your search with the '@' character. A single '@' as search input lists all available package groups.
          </Alert>
        )}
      


        {/* Search and Controls */}
        <div style={{ marginTop: '20px', marginBottom: '10px', display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
          {groupSearchEnabled && (
            <FormGroup 
              label={<span style={{ fontSize: '14px', fontWeight: 600 }}>Package type</span>} 
              fieldId="package-type-select"
            >
              <div style={{ width: '200px' }}>
                <FormSelect
                  value={packageTypeFilter}
                  onChange={(event, value) => setPackageTypeFilter(value as 'individual' | 'group')}
                  aria-label="Package type"
                >
                  <FormSelectOption value="individual" label="Individual package" />
                  <FormSelectOption value="group" label="Package group" />
                </FormSelect>
              </div>
            </FormGroup>
          )}
          <div style={{ position: 'relative' }}>
            <FormGroup 
              label={<span style={{ fontSize: '14px', fontWeight: 600 }}>Search packages</span>} 
              fieldId="package-search"
            >
              <div style={{ width: '300px' }}>
                <SearchInput
                  placeholder="Search packages..."
                  value={searchTerm}
                  onChange={(event, value) => handleSearch(value)}
                  onClear={handleClear}
                  onFocus={handleSearchFocus}
                  aria-label="Search packages"
                />
              </div>
            </FormGroup>
            {((searchInDropdown || searchingInOtherRepos) && searchTerm) || (showSearchRecommendations && !showRecommendations) ? (
              <div style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                right: 0,
                minWidth: '600px',
                backgroundColor: 'white',
                border: '1px solid #ccc',
                borderRadius: '4px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                maxHeight: '200px',
                overflowY: 'auto',
                zIndex: 1000
              }}>
                {showSearchRecommendations ? (
                  // Show search recommendations when Package Recommendations toggle is OFF
                  <div style={{ padding: '8px 0' }}>
                    <div style={{ 
                      padding: '8px 12px', 
                      fontSize: '12px', 
                      color: '#666',
                      borderBottom: '1px solid #f0f0f0',
                      backgroundColor: '#f8f9fa'
                    }}>
                      Suggested based on your selections • Enabled by RHEL Lightspeed
                    </div>
                    {searchRecommendations.map((pkg) => {
                      const isAlreadySelected = selectedPackages.has(pkg.name);
                      return (
                        <div
                          key={pkg.name}
                          onClick={() => !isAlreadySelected && handleAddPackage(pkg)}
                          style={{
                            padding: '12px 16px',
                            cursor: isAlreadySelected ? 'not-allowed' : 'pointer',
                            borderBottom: '1px solid #f0f0f0',
                            display: 'flex',
                            alignItems: 'center',
                            backgroundColor: isAlreadySelected ? '#f8f9fa' : 'white',
                            opacity: isAlreadySelected ? 0.6 : 1
                          }}
                          onMouseEnter={(e) => {
                            if (!isAlreadySelected) {
                              e.currentTarget.style.backgroundColor = '#f5f5f5';
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (!isAlreadySelected) {
                              e.currentTarget.style.backgroundColor = 'white';
                            }
                          }}
                        >
                          <div style={{ 
                            width: '16px', 
                            height: '16px', 
                            marginRight: '12px',
                            background: 'linear-gradient(135deg, #0066cc 0%, #4d9eff 100%)',
                            borderRadius: '3px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            fontSize: '10px',
                            fontWeight: 'bold'
                          }}>
                            ✨
                          </div>
                          <div style={{ flex: 1 }}>
                            <div style={{ fontWeight: '600', marginBottom: '2px' }}>
                              {getPackageDisplayName(pkg)} - {pkg.summary}
                            </div>
                          </div>
                          <span style={{ 
                            color: isAlreadySelected ? '#999' : '#0066cc', 
                            fontSize: '12px',
                            fontWeight: '500'
                          }}>
                            {isAlreadySelected ? '✓ Added' : '+ Add'}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                ) : dropdownFilteredPackages.length > 0 ? (
                  dropdownFilteredPackages.slice(0, 5).map((pkg) => {
                    const isAlreadySelected = selectedPackages.has(pkg.name);
                    return (
                    <div
                      key={pkg.name}
                      onClick={() => !isAlreadySelected && handleAddPackage(pkg)}
                      style={{
                        padding: '8px 12px',
                        cursor: isAlreadySelected ? 'not-allowed' : 'pointer',
                        borderBottom: '1px solid #f0f0f0',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        backgroundColor: isAlreadySelected ? '#f8f9fa' : 'white',
                        opacity: isAlreadySelected ? 0.6 : 1
                      }}
                      onMouseEnter={(e) => {
                        if (!isAlreadySelected) {
                          e.currentTarget.style.backgroundColor = '#f5f5f5';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isAlreadySelected) {
                          e.currentTarget.style.backgroundColor = 'white';
                        }
                      }}
                    >
                      <div>
                        <strong>{getPackageDisplayName(pkg)}</strong>
                        <br />
                        <small style={{ color: '#666' }}>{pkg.summary}</small>
                      </div>
                      <span style={{ 
                        color: isAlreadySelected ? '#999' : '#0066cc', 
                        fontSize: '12px' 
                      }}>
                        {isAlreadySelected ? '✓ Added' : '+ Add'}
                      </span>
                    </div>
                  );
                })
                ) : (
                  !otherReposEnabled && (
                    <div style={{
                      padding: '12px',
                      textAlign: 'center',
                      borderBottom: '1px solid #f0f0f0'
                    }}>
                      <div style={{ 
                        color: '#666', 
                        fontSize: '14px', 
                        marginBottom: '8px' 
                      }}>
                        No packages found matching your search.
                      </div>
                      <Button
                        variant={ButtonVariant.secondary}
                        onClick={handleSearchInOtherRepos}
                        isDisabled={isLoadingOtherRepos}
                        icon={isLoadingOtherRepos ? <Spinner size="sm" /> : undefined}
                      >
                        {isLoadingOtherRepos ? 'Searching...' : 'Search in Other Repos'}
                      </Button>
                    </div>
                  )
                )}
              </div>
            ) : null}
          </div>

          
          {enableToggles && !searchInDropdown && (
          <ToggleGroup>
            <ToggleGroupItem
                text={`Available${searchTerm && filteredPackages.length > 0 ? (hasViewedPackagesSelected ? ` (${Math.max(0, filteredPackages.length - selectedCount)})` : ` (${filteredPackages.length})`) : ''}`}
              buttonId="toggle-available"
              isSelected={toggleSelected === 'toggle-available'}
                onChange={() => handleAvailableToggle()}
            />
            <ToggleGroupItem
              text={`Selected${selectedCount ? ` (${selectedCount})` : ''}`}
              buttonId="toggle-selected"
              isSelected={toggleSelected === 'toggle-selected'}
                onChange={() => handleSelectedToggle()}
            />
          </ToggleGroup>
          )}
          
          {enableToggles && searchInDropdown && (
          <div style={{ color: '#666', fontSize: '14px' }}>
            Selected packages: {selectedCount}
          </div>
          )}
        </div>

        {/* Horizontal Tabs - only show when Other Repos toggle is ON */}
        {otherReposEnabled && (
          <div style={{ marginTop: '20px' }}>
            <Tabs
              activeKey={activeTabKey}
              onSelect={(_event, tabIndex) => setActiveTabKey(tabIndex.toString())}
              aria-label="Repositories tabs on packages step"
            >
              <Tab
                eventKey="included-repos"
                title={<TabTitleText>Included repos</TabTitleText>}
                aria-label="Included repositories"
              />
              <Tab
                eventKey="other-repos"
                title={<TabTitleText>Other repos</TabTitleText>}
                aria-label="Other repositories"
              />
            </Tabs>
          </div>
        )}

        {/* Packages Display using Table */}
          {(searchInDropdown && selectedPackages.size > 0) || (searchingInOtherRepos && selectedPackages.size > 0) || (!searchInDropdown && !searchingInOtherRepos && (searchTerm || toggleSelected === 'toggle-selected')) ? (
          <Table aria-label="Packages table" variant="compact">
            <Thead>
              <Tr>
                  {enableCheckboxes && (
                <Th aria-label="Select item"></Th>
                  )}
                <Th>Name</Th>
                  <Th>Source</Th>
                  <Th>Summary</Th>
                  {!enableCheckboxes && (
                    <Th width={15}>Actions</Th>
                  )}
              </Tr>
            </Thead>
            <Tbody>
              {paginatedPackages.map((pkg) => (
                <Tr key={pkg.name}>
                    {enableCheckboxes && (
                  <Td>
                    <Checkbox
                      id={`package-${pkg.name}`}
                      isChecked={selectedPackages.has(pkg.name)}
                          onChange={(event, checked) => handlePackageSelect(event, checked)}
                      aria-label={`Select package ${pkg.name}`}
                      data-package-name={pkg.name}
                    />
                  </Td>
                    )}
                    <Td>{getPackageDisplayName(pkg)}</Td>
                    <Td>{pkg.source}</Td>
                    <Td>{pkg.summary}</Td>
                    {!enableCheckboxes && (
                      <Td>
                        <Button
                          variant="plain"
                          aria-label="Remove package"
                          onClick={() => handleRemovePackage(pkg.name)}
                          style={{ 
                            padding: '4px', 
                            minWidth: 'auto',
                            color: '#666'
                          }}
                        >
                          <MinusCircleIcon style={{ color: '#000' }} />
                        </Button>
                  </Td>
                    )}
                </Tr>
              ))}
            </Tbody>
          </Table>
        ) : (
            /* Empty state placeholder to preserve height */
          <div style={{ 
              height: showAsOneStep ? '300px' : 'auto',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            color: '#666',
              fontSize: '14px',
              border: '1px dashed #ccc',
              borderRadius: '4px',
              backgroundColor: '#f8f9fa'
          }}>
              {searchTerm 
                ? 'No packages found matching your search.'
                : (toggleSelected as string) === 'toggle-selected' 
                  ? 'No packages selected. Use the search above to find and select packages.'
                  : 'Search for packages to see results here.'
              }
          </div>
        )}

        {/* Pagination */}
        {totalItems > perPage && (
          <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end' }}>
        <Pagination
          itemCount={totalItems}
          perPage={perPage}
          page={page}
          onSetPage={onSetPage}
          onPerPageSelect={onPerPageSelect}
          variant={PaginationVariant.bottom}
        />
          </div>
        )}

        {/* Package Recommendations */}
        {showRecommendations && (
          <div style={{ marginTop: '20px' }}>
            <Title headingLevel="h3" size="lg" style={{ marginBottom: '16px', color: '#151515' }}>
              Recommended Packages
            </Title>
            <div style={{ 
              border: '1px solid #d1d1d1', 
              borderRadius: '4px',
              overflow: 'hidden'
            }}>
              <Table variant="compact">
                <Thead>
                  <Tr>
                    <Th width={30}>Package name</Th>
                    <Th width={20}>Source</Th>
                    <Th width={40}>Summary</Th>
                    <Th width={10}>Actions</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {currentRecommendations.map((pkg) => (
                    <Tr key={pkg.name}>
                      <Td>{getPackageDisplayName(pkg)}</Td>
                      <Td>{pkg.source}</Td>
                      <Td>{pkg.summary}</Td>
                      <Td>
                        {/* Add functionality removed - not part of design system */}
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
        maxWidth: '90vw',
        maxHeight: '90vh',
        width: '1400px',
        height: '800px',
        overflow: 'auto',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden' }}>
          {/* Top Control Panel */}
          <div style={{
            backgroundColor: '#f8f9fa',
            borderBottom: '1px solid #d1d1d1',
            padding: '20px',
            zIndex: 1000,
            flexShrink: 0
          }}>
                        {/* Feature Toggles */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
              {/* Combine Steps Toggle */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div 
                  style={{
                    width: '44px',
                    height: '24px',
                    backgroundColor: showAsOneStep ? '#0066cc' : '#ccc',
                    borderRadius: '12px',
                    position: 'relative',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s ease'
                  }}
                  onClick={() => setShowAsOneStep(!showAsOneStep)}
                >
                  <div style={{
                    width: '20px',
                    height: '20px',
                    backgroundColor: 'white',
                    borderRadius: '50%',
                    position: 'absolute',
                    top: '2px',
                    left: showAsOneStep ? '22px' : '2px',
                    transition: 'left 0.2s ease',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                  }} />
                </div>
                <label htmlFor="toggle-two-steps" style={{ fontSize: '14px', fontWeight: '500', cursor: 'pointer' }}>
                  Combine steps
                </label>
              </div>

              {/* Enable Toggles Toggle */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div
                  style={{
                    width: '44px',
                    height: '24px',
                    backgroundColor: enableToggles ? '#0066cc' : '#ccc',
                    borderRadius: '12px',
                    position: 'relative',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s ease'
                  }}
                  onClick={() => {
                    setEnableToggles(!enableToggles);
                  }}
                >
                  <div style={{
                    width: '20px',
                    height: '20px',
                    backgroundColor: 'white',
                    borderRadius: '50%',
                    position: 'absolute',
                    top: '2px',
                    left: enableToggles ? '22px' : '2px',
                    transition: 'left 0.2s ease',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                  }} />
                </div>
                <label htmlFor="toggle-toggles" style={{ fontSize: '14px', fontWeight: '500', cursor: 'pointer' }}>
                  Enable toggles
                </label>
              </div>

              {/* Checkbox Adders Toggle */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div
                  style={{
                    width: '44px',
                    height: '24px',
                    backgroundColor: enableCheckboxes ? '#0066cc' : '#ccc',
                    borderRadius: '12px',
                    position: 'relative',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s ease'
                  }}
                  onClick={() => {
                    setEnableCheckboxes(!enableCheckboxes);
                  }}
                >
                  <div style={{
                    width: '20px',
                    height: '20px',
                    backgroundColor: 'white',
                    borderRadius: '50%',
                    position: 'absolute',
                    top: '2px',
                    left: enableCheckboxes ? '22px' : '2px',
                    transition: 'left 0.2s ease',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                  }} />
                </div>
                <label htmlFor="toggle-checkboxes" style={{ fontSize: '14px', fontWeight: '500', cursor: 'pointer' }}>
                  Checkbox Adders
                </label>
              </div>

              {/* Search in Dropdown Toggle */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div
                  style={{
                    width: '44px',
                    height: '24px',
                    backgroundColor: searchInDropdown ? '#0066cc' : '#ccc',
                    borderRadius: '12px',
                    position: 'relative',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s ease'
                  }}
                  onClick={() => {
                    setSearchInDropdown(!searchInDropdown);
                  }}
                >
                  <div style={{
                    width: '20px',
                    height: '20px',
                    backgroundColor: 'white',
                    borderRadius: '50%',
                    position: 'absolute',
                    top: '2px',
                    left: searchInDropdown ? '22px' : '2px',
                    transition: 'left 0.2s ease',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                  }} />
                </div>
                <label htmlFor="toggle-dropdown" style={{ fontSize: '14px', fontWeight: '500', cursor: 'pointer' }}>
                  Search in Dropdown
                </label>
              </div>

              {/* Other Repos Toggle */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div
                  style={{
                    width: '44px',
                    height: '24px',
                    backgroundColor: otherReposEnabled ? '#0066cc' : '#ccc',
                    borderRadius: '12px',
                    position: 'relative',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s ease'
                  }}
                  onClick={() => {
                    setOtherReposEnabled(!otherReposEnabled);
                    // Reset searching in other repos when toggle is turned on
                    if (!otherReposEnabled) {
                      setSearchingInOtherRepos(false);
                    }
                  }}
                >
                  <div style={{
                    width: '20px',
                    height: '20px',
                    backgroundColor: 'white',
                    borderRadius: '50%',
                    position: 'absolute',
                    top: '2px',
                    left: otherReposEnabled ? '22px' : '2px',
                    transition: 'left 0.2s ease',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                  }} />
                </div>
                <label htmlFor="toggle-other-repos" style={{ fontSize: '14px', fontWeight: '500', cursor: 'pointer' }}>
                  Other Repos
                </label>
              </div>

              {/* Group Search Toggle */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div
                  style={{
                    width: '44px',
                    height: '24px',
                    backgroundColor: groupSearchEnabled ? '#0066cc' : '#ccc',
                    borderRadius: '12px',
                    position: 'relative',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s ease'
                  }}
                  onClick={() => setGroupSearchEnabled(!groupSearchEnabled)}
                >
                  <div style={{
                    width: '20px',
                    height: '20px',
                    backgroundColor: 'white',
                    borderRadius: '50%',
                    position: 'absolute',
                    top: '2px',
                    left: groupSearchEnabled ? '22px' : '2px',
                    transition: 'left 0.2s ease',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                  }} />
                </div>
                <label htmlFor="toggle-group-search" style={{ fontSize: '14px', fontWeight: '500', cursor: 'pointer' }}>
                  Group search
                </label>
              </div>

              {/* Package Recommendations Toggle */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div
                  style={{
                    width: '44px',
                    height: '24px',
                    backgroundColor: showRecommendations ? '#0066cc' : '#ccc',
                    borderRadius: '12px',
                    position: 'relative',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s ease'
                  }}
                  onClick={() => setShowRecommendations(!showRecommendations)}
                >
                  <div style={{
                    width: '20px',
                    height: '20px',
                    backgroundColor: 'white',
                    borderRadius: '50%',
                    position: 'absolute',
                    top: '2px',
                    left: showRecommendations ? '22px' : '2px',
                    transition: 'left 0.2s ease',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                  }} />
                </div>
                <label htmlFor="toggle-recommendations" style={{ fontSize: '14px', fontWeight: '500', cursor: 'pointer' }}>
                  Package Recommendations
                </label>
              </div>

              {/* Obscure Package and Repository Names Toggle */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div
                  style={{
                    width: '44px',
                    height: '24px',
                    backgroundColor: obscureNames ? '#0066cc' : '#ccc',
                    borderRadius: '12px',
                    position: 'relative',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s ease'
                  }}
                  onClick={() => setObscureNames(!obscureNames)}
                >
                  <div style={{
                    width: '20px',
                    height: '20px',
                    backgroundColor: 'white',
                    borderRadius: '50%',
                    position: 'absolute',
                    top: '2px',
                    left: obscureNames ? '22px' : '2px',
                    transition: 'left 0.2s ease',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                  }} />
                </div>
                <label htmlFor="toggle-obscure-names" style={{ fontSize: '14px', fontWeight: '500', cursor: 'pointer' }}>
                  Obscure Package and Repository Names
                </label>
              </div>
            </div>
          </div>

          {/* Main Content with Sidebar */}
          <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
          {/* Left Sidebar Navigation */}
          <div style={{ 
            width: '250px', 
            backgroundColor: '#f8f9fa', 
            borderRight: '1px solid #d1d1d1',
            padding: '20px',
            overflowY: 'auto',
            flexShrink: 0
          }}>
            <Nav onSelect={(event, itemId) => {
              const stepId = typeof itemId === 'string' ? itemId : itemId.itemId;
              handleStepChange(stepId);
            }}>
              <NavList>
                  {showAsOneStep ? (
                    /* Combined Step Navigation */
                    <NavItem 
                      itemId="packages-and-repositories" 
                      isActive={true}
                      className="custom-nav-item"
                    >
                      <div style={{ 
                        display: 'flex', 
                        alignItems: 'center',
                        color: '#0066cc'
                      }}>
                        <PackageIcon style={{ 
                          marginRight: '12px', 
                          color: '#0066cc'
                        }} />
                        <span style={{ 
                          fontWeight: '600'
                        }}>
                          Packages and Repositories
                        </span>
                      </div>
                    </NavItem>
                  ) : (
                    /* Two Step Navigation */
                    <>
                <NavItem 
                  itemId="custom-repositories" 
                  isActive={activeStep === 'custom-repositories'}
                  className="custom-nav-item"
                >
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center',
                    color: activeStep === 'custom-repositories' ? '#0066cc' : '#333'
                  }}>
                    <RepositoryIcon style={{ 
                      marginRight: '12px', 
                      color: activeStep === 'custom-repositories' ? '#0066cc' : '#666'
                    }} />
                    <span style={{ 
                      fontWeight: activeStep === 'custom-repositories' ? '600' : '400'
                    }}>
                      Custom Repositories
                    </span>
                  </div>
                </NavItem>
                <NavItem 
                  itemId="additional-packages" 
                  isActive={activeStep === 'additional-packages'}
                  className="custom-nav-item"
                >
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center',
                    color: activeStep === 'additional-packages' ? '#0066cc' : '#666'
                  }}>
                                      <PackageIcon style={{ 
                    marginRight: '12px', 
                    color: activeStep === 'additional-packages' ? '#0066cc' : '#666'
                  }} />
                    <span style={{ 
                      fontWeight: activeStep === 'additional-packages' ? '600' : '400'
                    }}>
                      Additional Packages
                    </span>
                  </div>
                </NavItem>
                    </>
                  )}
              </NavList>
            </Nav>
          </div>

          {/* Main Content Area */}
            <div style={{ 
              flex: 1, 
              padding: '20px',
              overflowY: 'auto',
              overflowX: 'hidden'
            }}>
              {showAsOneStep ? (
                /* Combined View - Show all content */
                <>
                  {/* Custom Repositories Step */}
                  <div style={{ marginBottom: '20px' }}>
                    {renderCustomRepositories()}
                  </div>

                  {/* Additional Packages Step */}
                  <div>
                    {renderAdditionalPackages()}
                  </div>
                </>
              ) : (
                /* Two Step View - Show content based on active step */
                <>
            {/* Custom Repositories Step */}
            <div style={{ 
              marginBottom: '40px',
              display: activeStep === 'custom-repositories' ? 'block' : 'none'
            }}>
              {renderCustomRepositories()}
            </div>

            {/* Additional Packages Step */}
            <div style={{
              display: activeStep === 'additional-packages' ? 'block' : 'none'
            }}>
              {renderAdditionalPackages()}
            </div>
                </>
              )}
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default AdditionalPackages;
