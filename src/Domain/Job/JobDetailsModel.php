<?php


class JobDetailsModel
{
  private PDO $connection;

    public function __construct(PDO $connection)
    {
        $this->connection = $connection;
    }

    public function getAll(): array
    {
        try {
            $stmt = $this->connection->prepare('SELECT * FROM job');
            $stmt->execute();
            $data = $stmt->fetchAll();
            
            if (!$data) {
                return array();
            }
            return $data;

        } catch (PDOException $exception) {
            error_log('ActivityModel: getAll: ' . $exception->getMessage());
            throw $exception;
        }
    }

    public function getRow($id): array{
            $stmt = $this->connection->prepare("SELECT * FROM job WHERE jobId='$id'");
            $stmt->execute();
            $data = $stmt->fetch(PDO::FETCH_ASSOC);
            // print_r($data);
            if(!$data){
                return array();
            }
            return $data;     

    }
}

?>